#!/usr/bin/env node
/**
 * Measure every track in public/audio/ and print ready-to-paste MusicTrack
 * entries for src/film/music.ts.
 *
 * Remotion's bundled ffmpeg is a minimal build — it has no `volumedetect`
 * filter — but ffprobe still reports duration, which is all we need here.
 *
 * Usage: npm run audio-info
 */
import { execSync } from "node:child_process";
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const DIR = "../public/audio";
const FPS = 30;
const FILM_SECONDS = 50;

const audio = readdirSync(DIR)
  .filter((f) => /\.(mp3|wav|m4a|aac|ogg|flac)$/i.test(f))
  .sort();

if (audio.length === 0) {
  console.log(`No audio found in ${DIR}`);
  process.exit(0);
}

const probe = (file) => {
  // shell: true is required on Windows, where npx is a .cmd shim and
  // spawnSync refuses it with EINVAL. ffprobe reports Duration on stderr,
  // not stdout, so both streams are captured and searched.
  let out = "";
  try {
    out = execSync(`npx remotion ffprobe "${join(DIR, file)}" 2>&1`, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
  } catch (err) {
    out = `${err.stdout ?? ""}${err.stderr ?? ""}`;
  }
  const m = /Duration: (\d+):(\d+):(\d+\.\d+)/.exec(out);
  if (!m) return null;
  return Number(m[1]) * 3600 + Number(m[2]) * 60 + Number(m[3]);
};

console.log(`\nTracks in public/audio/  (film is ${FILM_SECONDS}s)\n`);
for (const file of audio) {
  const secs = probe(file);
  const kb = Math.round(statSync(join(DIR, file)).size / 1024);
  if (secs === null) {
    console.log(`  ${file}  —  could not read duration`);
    continue;
  }
  const frames = Math.round(secs * FPS);
  const loops = secs < FILM_SECONDS;
  const note = loops
    ? `loops ${(FILM_SECONDS / secs).toFixed(2)}x — seam will be audible without the dip`
    : "long enough, never loops";
  console.log(`  ${file}  ${secs.toFixed(2)}s  ${kb}KB`);
  console.log(`    ${note}`);
  console.log(`    { src: "audio/${file}", loopFrames: ${frames} }\n`);
}
console.log("Paste the matching line into src/film/music.ts.\n");
