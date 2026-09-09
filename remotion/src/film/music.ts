/**
 * Per-film music beds.
 *
 * One track shared across three films reads as a template, so each film gets
 * its own. Files live in `public/audio/` and are named after the film that
 * uses them; `public/audio/CREDITS.md` records their original filenames and
 * measured characteristics.
 *
 * To swap a track: drop the file in `public/audio/`, run `npm run audio-info`
 * from `remotion/`, and paste the line it prints.
 *
 * WHY `loopFrames` MATTERS: a track shorter than the film's 50s has to loop,
 * and this value tells the volume curve where the seam falls so it can dip
 * either side of it. Get it wrong and the restart is audible as a hard cut.
 * A track of 50s or longer never loops — set the real length anyway and the
 * seam logic simply never fires.
 *
 * WHY `level` VARIES: library tracks are mastered inconsistently. The two new
 * beds average about -13.4 dBFS over their first 50s while the old funky.mp3
 * sits at -17.1, so at one shared level the new ones would land nearly 4 dB
 * hotter. Each level is trimmed to put all three at roughly the same output,
 * around -20 dBFS in the finished file.
 */
export interface MusicTrack {
  /** Path relative to `public/`, as passed to staticFile(). */
  src: string;
  /** Track length in frames at 30fps — i.e. seconds x 30, rounded. */
  loopFrames: number;
  /** Optional per-track level, 0-1. Defaults to the shared bed level. */
  level?: number;
}

/**
 * Equity Pulse — PLACEHOLDER.
 *
 * The brief for this one is analytical and measured, a little tense: it is
 * someone's portfolio being scrutinised, not a product launch. None of the
 * available tracks fit that, and this is the only film still on the short
 * 27s bed, so it loops 1.85 times across the film. It is the next thing to
 * replace. Of the three it is at least the darkest — 886 zero-crossings/sec
 * against 1121 and 1823 — so it is the least wrong option available today.
 */
export const EQUITY_PULSE_MUSIC: MusicTrack = {
  src: "audio/funky.mp3",
  loopFrames: 809,
  level: 0.58,
};

/**
 * Excelr8 — 115 BPM, the highest energy variability of the three (0.69) and
 * the loudest master. Driving and forward-leaning, which is the right read for
 * an outbound sales pipeline. 138s, so it never loops.
 */
export const EXCELR8_MUSIC: MusicTrack = {
  src: "audio/excelr8.mp3",
  loopFrames: 4149,
  level: 0.37,
};

/**
 * Zippit — 83 BPM, by far the brightest top end (1823 zero-crossings/sec) and
 * the steadiest (0.45), and tagged for advertising use. Lighter and editorial,
 * which suits a content studio rather than a trading floor. 125s, never loops.
 */
export const ZIPPIT_MUSIC: MusicTrack = {
  src: "audio/zippit.mp3",
  loopFrames: 3745,
  level: 0.39,
};

/**
 * Dossier Bot — PLACEHOLDER, sharing Equity Pulse's bed.
 *
 * Only two new tracks were sourced, so two of the four films are on the short
 * 27s loop. The brief for this one: conversational and a little wry. It is a
 * bot you talk to, not a pipeline you watch.
 */
export const DOSSIER_MUSIC: MusicTrack = {
  src: "audio/funky.mp3",
  loopFrames: 809,
  level: 0.58,
};
