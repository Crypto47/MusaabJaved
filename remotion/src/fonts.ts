/**
 * The portfolio's own typefaces, loaded into the video for brand continuity.
 *
 * `src/resources/once-ui.config.ts` sets Instrument Serif for headings and
 * Instrument Sans for body on the site; using the same pair here means the
 * video doesn't look like it came from somewhere else.
 *
 * Two hard constraints from the font files themselves:
 *   - Instrument Serif ships weight 400 ONLY.
 *   - Instrument Sans tops out at 700.
 * The older ep/ex/zp components ask for 800 and 900, which browsers fake by
 * smearing the outlines. Nothing here goes above 700.
 *
 * @remotion/google-fonts calls delayRender/continueRender internally, so the
 * render blocks until the faces are ready — no flash of fallback type, and no
 * frame-to-frame variation across parallel render tabs.
 */
import { loadFont as loadSans } from "@remotion/google-fonts/InstrumentSans";
import { loadFont as loadSerif } from "@remotion/google-fonts/InstrumentSerif";

const serif = loadSerif("normal", { weights: ["400"], subsets: ["latin"] });
const sans = loadSans("normal", { weights: ["400", "500", "600", "700"], subsets: ["latin"] });

/** Display face — headlines, metric numbers, the end-card name. */
export const DISPLAY = `${serif.fontFamily}, ui-serif, Georgia, serif`;
/** Body face — captions, labels, node names. */
export const BODY = `${sans.fontFamily}, ui-sans-serif, system-ui, sans-serif`;

/** Await both faces where a component needs measured text. */
export const waitForFonts = async () => {
  await serif.waitUntilDone();
  await sans.waitUntilDone();
};
