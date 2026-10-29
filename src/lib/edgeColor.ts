// Average colour of an image's outer edge, used to fill the space around an
// image shown with object-contain so the padding blends in (white around light
// screenshots, dark around dark ones). Works on same-origin images, which
// includes everything served through next/image.
export function edgeColor(img: HTMLImageElement): string | null {
  try {
    const size = 32;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return null;
    ctx.drawImage(img, 0, 0, size, size);
    const { data } = ctx.getImageData(0, 0, size, size);

    let r = 0, g = 0, b = 0, n = 0;
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        // outer 2-pixel ring only
        if (x > 1 && x < size - 2 && y > 1 && y < size - 2) continue;
        const i = (y * size + x) * 4;
        r += data[i]; g += data[i + 1]; b += data[i + 2]; n++;
      }
    }
    return `rgb(${Math.round(r / n)}, ${Math.round(g / n)}, ${Math.round(b / n)})`;
  } catch {
    // Cross-origin image without CORS: keep the default background
    return null;
  }
}

// Pick tags that fit on one card line (rough character budget); the rest go into "+N"
export function tagsThatFit(tags: string[], budget = 26): string[] {
  const shown: string[] = [];
  let used = 0;
  for (const tag of tags) {
    if (shown.length > 0 && used + tag.length > budget) break;
    shown.push(tag);
    used += tag.length;
  }
  return shown;
}
