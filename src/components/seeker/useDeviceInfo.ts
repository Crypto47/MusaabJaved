"use client";

import { useEffect, useState } from "react";
import { UAParser } from "ua-parser-js";

export interface DeviceData {
  browser: { name: string; version: string; engine: string };
  os: { name: string; version: string };
  device: { type: string; vendor: string; model: string };
  screen: {
    resolution: string;
    viewport: string;
    pixelRatio: number;
    colorDepth: number;
    maxTouchPoints: number;
    orientation: string;
  };
  network: {
    online: boolean;
    connectionType: string;
    downlink: string;
    language: string;
    languages: string;
    timezone: string;
    timezoneOffset: string;
    doNotTrack: string;
    cookiesEnabled: boolean;
    localIPs: string[];
  };
  hardware: {
    hardwareConcurrency: number;
    deviceMemory: string;
    platform: string;
    pdfViewerEnabled: boolean;
    heapUsed: string;
    heapTotal: string;
  };
  fingerprint: {
    visitorId: string;
    canvas: string;
    audio: string;
    webGLVendor: string;
    webGLRenderer: string;
    plugins: string;
  };
  battery: {
    level: string;
    charging: boolean;
    timeToFull: string;
    timeToEmpty: string;
  } | null;
  storage: {
    quota: string;
    used: string;
    percent: string;
  } | null;
  permissions: Record<string, string>;
  preferences: {
    darkMode: string;
    reducedMotion: string;
    highContrast: string;
    colorScheme: string;
  };
  media: {
    cameras: number;
    microphones: number;
    speakers: number;
    speechVoices: number;
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function getCanvasFingerprint(): string {
  try {
    const canvas = document.createElement("canvas");
    canvas.width = 200;
    canvas.height = 50;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "unavailable";
    ctx.textBaseline = "top";
    ctx.font = "14px Arial";
    ctx.fillStyle = "#f60";
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = "#069";
    ctx.fillText("SEEKER", 2, 15);
    ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
    ctx.fillText("SEEKER", 4, 17);
    return canvas.toDataURL().slice(-32);
  } catch {
    return "blocked";
  }
}

async function getAudioFingerprint(): Promise<string> {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return "unavailable";
    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    const analyser = ctx.createAnalyser();
    const gain = ctx.createGain();
    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(10000, ctx.currentTime);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    oscillator.connect(analyser);
    analyser.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start(0);
    const buffer = new Float32Array(analyser.frequencyBinCount);
    analyser.getFloatFrequencyData(buffer);
    oscillator.stop();
    await ctx.close();
    const hash = buffer.slice(0, 10).reduce((acc, val) => acc + Math.abs(val), 0);
    return hash.toFixed(6);
  } catch {
    return "blocked";
  }
}

function getWebGLInfo(): { vendor: string; renderer: string } {
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) return { vendor: "unavailable", renderer: "unavailable" };
    const dbg = gl.getExtension("WEBGL_debug_renderer_info");
    if (!dbg) return { vendor: "hidden", renderer: "hidden" };
    return {
      vendor: gl.getParameter(dbg.UNMASKED_VENDOR_WEBGL) || "unknown",
      renderer: gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) || "unknown",
    };
  } catch {
    return { vendor: "blocked", renderer: "blocked" };
  }
}

function getPlugins(): string {
  try {
    const p = Array.from(navigator.plugins);
    if (!p.length) return "none";
    return p
      .slice(0, 3)
      .map((x) => x.name)
      .join(", ")
      .concat(p.length > 3 ? ` +${p.length - 3} more` : "");
  } catch {
    return "inaccessible";
  }
}

function buildVisitorId(canvas: string): string {
  const raw = [
    navigator.userAgent,
    navigator.language,
    screen.colorDepth,
    new Date().getTimezoneOffset(),
    canvas,
    navigator.hardwareConcurrency,
    (navigator as any).deviceMemory,
  ].join("###");
  let h = 0x811c9dc5;
  for (let i = 0; i < raw.length; i++) {
    h ^= raw.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).toUpperCase().padStart(8, "0");
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`;
}

function formatSeconds(seconds: number): string {
  if (!isFinite(seconds)) return "N/A";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m} min`;
  return `${seconds}s`;
}

function getLocalIPs(): Promise<string[]> {
  return new Promise((resolve) => {
    const ips: string[] = [];
    try {
      const pc = new RTCPeerConnection({ iceServers: [] });
      pc.createDataChannel("");
      pc.createOffer().then((offer) => pc.setLocalDescription(offer));
      pc.onicecandidate = (ice) => {
        if (!ice.candidate) {
          pc.close();
          resolve([...new Set(ips)]);
          return;
        }
        const match = ice.candidate.candidate.match(
          /([0-9]{1,3}(?:\.[0-9]{1,3}){3}|[a-f0-9:]+)/gi,
        );
        if (match) {
          match
            .filter(
              (ip) =>
                !ip.startsWith("0.") &&
                ip !== "0.0.0.0" &&
                ip !== "127.0.0.1" &&
                !ip.includes("::1"),
            )
            .forEach((ip) => ips.push(ip));
        }
      };
      setTimeout(() => {
        pc.close();
        resolve([...new Set(ips)]);
      }, 500);
    } catch {
      resolve([]);
    }
  });
}

async function getBatteryInfo(): Promise<DeviceData["battery"]> {
  try {
    const bat = await (navigator as any).getBattery?.();
    if (!bat) return null;
    return {
      level: `${Math.round(bat.level * 100)}%`,
      charging: bat.charging,
      timeToFull: formatSeconds(bat.chargingTime),
      timeToEmpty: formatSeconds(bat.dischargingTime),
    };
  } catch {
    return null;
  }
}

async function getStorageInfo(): Promise<DeviceData["storage"]> {
  try {
    const est = await navigator.storage?.estimate();
    if (!est || !est.quota) return null;
    const pct = est.usage && est.quota
      ? ((est.usage / est.quota) * 100).toFixed(1)
      : "0";
    return {
      quota: formatBytes(est.quota),
      used: formatBytes(est.usage ?? 0),
      percent: `${pct}%`,
    };
  } catch {
    return null;
  }
}

async function checkPermissions(): Promise<Record<string, string>> {
  const names: PermissionName[] = [
    "camera" as PermissionName,
    "microphone" as PermissionName,
    "geolocation" as PermissionName,
    "notifications" as PermissionName,
    "clipboard-read" as PermissionName,
    "clipboard-write" as PermissionName,
  ];
  const results: Record<string, string> = {};
  await Promise.allSettled(
    names.map(async (name) => {
      try {
        const status = await navigator.permissions.query({ name });
        results[name] = status.state;
      } catch {
        results[name] = "unsupported";
      }
    }),
  );
  return results;
}

async function getMediaDeviceCounts(): Promise<DeviceData["media"]> {
  try {
    const devices = await navigator.mediaDevices?.enumerateDevices();
    const cameras = devices.filter((d) => d.kind === "videoinput").length;
    const mics = devices.filter((d) => d.kind === "audioinput").length;
    const speakers = devices.filter((d) => d.kind === "audiooutput").length;
    const voices = window.speechSynthesis?.getVoices().length ?? 0;
    return { cameras, microphones: mics, speakers, speechVoices: voices };
  } catch {
    const voices = window.speechSynthesis?.getVoices().length ?? 0;
    return { cameras: 0, microphones: 0, speakers: 0, speechVoices: voices };
  }
}

function getMemoryInfo(): { heapUsed: string; heapTotal: string } {
  try {
    const mem = (performance as any).memory;
    if (!mem) return { heapUsed: "N/A", heapTotal: "N/A" };
    return {
      heapUsed: formatBytes(mem.usedJSHeapSize),
      heapTotal: formatBytes(mem.totalJSHeapSize),
    };
  } catch {
    return { heapUsed: "N/A", heapTotal: "N/A" };
  }
}

// ── Hook ─────────────────────────────────────────────────────────────────────

export function useDeviceInfo() {
  const [data, setData] = useState<DeviceData | null>(null);

  useEffect(() => {
    async function collect() {
      const parser = new UAParser();
      const r = parser.getResult();
      const canvas = getCanvasFingerprint();
      const webgl = getWebGLInfo();
      const conn = (navigator as any).connection ||
        (navigator as any).mozConnection ||
        (navigator as any).webkitConnection;
      const memory = getMemoryInfo();
      const offset = new Date().getTimezoneOffset();
      const offsetHrs = Math.abs(Math.floor(offset / 60));
      const offsetMin = Math.abs(offset % 60);
      const offsetStr = `UTC${offset <= 0 ? "+" : "-"}${String(offsetHrs).padStart(2, "0")}:${String(offsetMin).padStart(2, "0")}`;

      const screenOrientation =
        (screen.orientation?.type ?? "unknown").replace(/-/g, " ");

      // Preferences
      const preferences: DeviceData["preferences"] = {
        darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "Dark"
          : "Light",
        reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "Yes"
          : "No",
        highContrast: window.matchMedia("(forced-colors: active)").matches
          ? "Yes"
          : "No",
        colorScheme: window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light",
      };

      // Kick off async work in parallel
      const [localIPs, battery, storage, permissions, media, audio] = await Promise.all([
        getLocalIPs(),
        getBatteryInfo(),
        getStorageInfo(),
        checkPermissions(),
        getMediaDeviceCounts(),
        getAudioFingerprint(),
      ]);

      setData({
        browser: {
          name: r.browser.name || "Unknown",
          version: r.browser.version || "Unknown",
          engine: r.engine.name || "Unknown",
        },
        os: {
          name: r.os.name || "Unknown",
          version: r.os.version || "Unknown",
        },
        device: {
          type: r.device.type || "desktop",
          vendor: r.device.vendor || "Unknown",
          model: r.device.model || "Unknown",
        },
        screen: {
          resolution: `${screen.width}x${screen.height}`,
          viewport: `${window.innerWidth}x${window.innerHeight}`,
          pixelRatio: Math.round(window.devicePixelRatio * 100) / 100,
          colorDepth: screen.colorDepth,
          maxTouchPoints: navigator.maxTouchPoints,
          orientation: screenOrientation,
        },
        network: {
          online: navigator.onLine,
          connectionType: conn?.effectiveType || conn?.type || "unknown",
          downlink: conn?.downlink ? `${conn.downlink} Mbps` : "unknown",
          language: navigator.language,
          languages: (navigator.languages || [navigator.language]).join(", "),
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          timezoneOffset: offsetStr,
          doNotTrack: navigator.doNotTrack ?? "not set",
          cookiesEnabled: navigator.cookieEnabled,
          localIPs,
        },
        hardware: {
          hardwareConcurrency: navigator.hardwareConcurrency || 0,
          deviceMemory: (navigator as any).deviceMemory
            ? `${(navigator as any).deviceMemory} GB`
            : "unknown",
          platform: navigator.platform || "Unknown",
          pdfViewerEnabled: (navigator as any).pdfViewerEnabled ?? false,
          heapUsed: memory.heapUsed,
          heapTotal: memory.heapTotal,
        },
        fingerprint: {
          visitorId: buildVisitorId(canvas),
          canvas,
          audio,
          webGLVendor: webgl.vendor,
          webGLRenderer: webgl.renderer,
          plugins: getPlugins(),
        },
        battery,
        storage,
        permissions,
        preferences,
        media,
      });
    }

    collect();
  }, []);

  return data;
}
