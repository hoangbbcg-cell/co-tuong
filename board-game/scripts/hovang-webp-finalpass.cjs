'use strict';

const fs = require('fs');
const path = require('path');
const { createRequire } = require('module');

async function main() {
  const root = process.cwd();
  const sharp = createRequire(path.join(root, 'package.json'))('sharp');

  const directory = path.resolve(process.argv[2] || 'dist');
  const mode = process.argv[3] || 'preview';
  const output = process.argv[4] || '';

  if (!['preview', 'apply'].includes(mode)) {
    throw new Error('Invalid mode');
  }

  if (!fs.existsSync(path.join(directory, 'index.html'))) {
    throw new Error('Invalid build folder');
  }

  const files = [];

  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.isFile() && /\.webp$/i.test(entry.name)) {
        files.push(full);
      }
    }
  }

  walk(directory);

  let eligibleBytes = 0;
  let originalBytes = 0;
  let candidateBytes = 0;
  let skipped = 0;
  const candidates = [];

  for (const file of files) {
    const original = fs.readFileSync(file);
    originalBytes += original.length;

    const meta = await sharp(original).metadata();

    if (meta.format !== 'webp' ||
        !meta.width ||
        !meta.height ||
        meta.pages > 1 ||
        meta.hasProfile) {
      skipped++;
      continue;
    }

    // Re-encode as WebP, preserving alpha support.
    const candidate = await sharp(original)
      .webp({
        quality: 76,
        alphaQuality: 100,
        effort: 5
      })
      .toBuffer();

    const next = await sharp(candidate).metadata();

    if (next.format !== 'webp' ||
        next.width !== meta.width ||
        next.height !== meta.height ||
        Boolean(next.hasAlpha) !== Boolean(meta.hasAlpha)) {
      skipped++;
      continue;
    }

    // Require at least 3% saving per image.
    if (candidate.length >= original.length * 0.97) {
      skipped++;
      continue;
    }

    eligibleBytes += original.length;
    candidateBytes += candidate.length;

    candidates.push({
      file,
      bytes: candidate,
      oldSize: original.length,
      newSize: candidate.length
    });
  }

  const saved = eligibleBytes - candidateBytes;
  const minimum = 5 * 1024 * 1024;
  const approved = saved >= minimum;

  const result = {
    status: approved ? 'THRESHOLD_PASS' : 'BELOW_THRESHOLD',
    mode,
    quality: 76,
    totalWebpFiles: files.length,
    optimizedFiles: candidates.length,
    skippedFiles: skipped,
    originalWebpMiB: +(originalBytes / 1048576).toFixed(4),
    eligibleBeforeMiB: +(eligibleBytes / 1048576).toFixed(4),
    eligibleAfterMiB: +(candidateBytes / 1048576).toFixed(4),
    savedMiB: +(saved / 1048576).toFixed(4),
    minimumSavingMiB: 5
  };

  if (mode === 'apply') {
    if (!approved) {
      throw new Error(
        'Less than 5 MiB saved: ' + result.savedMiB
      );
    }

    // All candidates were validated before any replacement.
    for (const entry of candidates) {
      fs.writeFileSync(entry.file, entry.bytes);
    }

    result.status = 'APPLIED';
  }

  const serialized = JSON.stringify(result, null, 2);

  if (output) {
    fs.writeFileSync(path.resolve(output), serialized);
  }

  console.log(serialized);
}

main().catch(error => {
  console.error('STOP:', error.message);
  process.exitCode = 1;
});