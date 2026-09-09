/**
 * Camera over a flow graph.
 *
 * The graphs are 4:1 to 8:1 against a 16:9 frame, so fitting one whole puts
 * node labels at ~6px against a ~40px legibility floor at 1080p. Focus-and-pan
 * is therefore the only way this reads — not a stylistic flourish.
 *
 * Interpolating `zoom` and `translate` independently is WRONG for large zoom
 * ratios: scale multiplies translate, so on-screen motion accelerates through
 * the move (the classic "swoop"). We interpolate the *view* — centre plus
 * width — with d3's `interpolateZoom`, which implements van Wijk & Nuij's
 * smooth zoom-and-pan along a curved path in (x, y, scale) space. It is a pure
 * function of t, so it stays deterministic under parallel frame rendering.
 *
 * https://d3js.org/d3-interpolate/zoom
 * https://jakearchibald.com/2025/animating-zooming/
 */
import { interpolateZoom } from "d3-interpolate";
import { Easing, interpolate } from "remotion";
import type { Box } from "./geometry";

/** A viewport expressed in canvas units: centre x, centre y, visible width. */
export type View = [cx: number, cy: number, width: number];

export interface Camera {
  tx: number;
  ty: number;
  zoom: number;
}

/**
 * Smallest view that contains `box`, given the frame aspect ratio.
 * `pad` > 1 leaves breathing room around the subject.
 */
export const viewOfBox = (box: Box, aspect: number, pad = 1.15): View => [
  box.x + box.w / 2,
  box.y + box.h / 2,
  Math.max(box.w, box.h * aspect) * pad,
];

/**
 * Turn a view into an SVG/CSS transform.
 *
 * `anchorY` is where the view's centre sits vertically in the frame, as a
 * fraction of its height. Anchoring above centre (~0.42) leaves room for a
 * caption underneath and reads better than dead-centring — a trick borrowed
 * from nodetool's Remotion camera.
 */
export const cameraOfView = (
  [cx, cy, width]: View,
  frameWidth: number,
  frameHeight: number,
  anchorY = 0.5,
): Camera => {
  const zoom = frameWidth / width;
  return {
    zoom,
    tx: frameWidth / 2 - cx * zoom,
    ty: frameHeight * anchorY - cy * zoom,
  };
};

export interface CameraKey {
  /** Frame at which the camera has fully arrived at `view`. */
  frame: number;
  view: View;
  /** Vertical anchor once settled; interpolated alongside the view. */
  anchorY?: number;
}

/**
 * Sample a keyframed camera. Holds before the first key and after the last,
 * and eases each leg with a CSS-style ease-out.
 */
export const sampleCamera = (
  keys: CameraKey[],
  frame: number,
  frameWidth: number,
  frameHeight: number,
): Camera => {
  if (keys.length === 0) {
    return { tx: 0, ty: 0, zoom: 1 };
  }
  const first = keys[0];
  if (keys.length === 1 || frame <= first.frame) {
    return cameraOfView(first.view, frameWidth, frameHeight, first.anchorY ?? 0.5);
  }
  const last = keys[keys.length - 1];
  if (frame >= last.frame) {
    return cameraOfView(last.view, frameWidth, frameHeight, last.anchorY ?? 0.5);
  }

  let i = 0;
  while (i < keys.length - 1 && keys[i + 1].frame <= frame) i++;
  const a = keys[i];
  const b = keys[i + 1];

  const t = interpolate(frame, [a.frame, b.frame], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const view = interpolateZoom(a.view, b.view)(t) as View;
  const anchorY = interpolate(t, [0, 1], [a.anchorY ?? 0.5, b.anchorY ?? 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return cameraOfView(view, frameWidth, frameHeight, anchorY);
};

/** SVG transform string for the graph group. Order is translate-then-scale. */
export const cameraTransform = (cam: Camera) =>
  `translate(${cam.tx} ${cam.ty}) scale(${cam.zoom})`;

/** Project a canvas-space point into frame space, for screen-fixed overlays. */
export const canvasToScreen = (p: { x: number; y: number }, cam: Camera) => ({
  x: p.x * cam.zoom + cam.tx,
  y: p.y * cam.zoom + cam.ty,
});

/** Bounding box covering several nodes, used to build a focus view. */
export const boxAround = (boxes: Box[], pad = 0): Box => {
  const minX = Math.min(...boxes.map((b) => b.x)) - pad;
  const minY = Math.min(...boxes.map((b) => b.y)) - pad;
  const maxX = Math.max(...boxes.map((b) => b.x + b.w)) + pad;
  const maxY = Math.max(...boxes.map((b) => b.y + b.h)) + pad;
  return { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
};
