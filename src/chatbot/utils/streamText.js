/**
 * streamText.js
 * ------------------------------------------------------------------
 * Simulates token streaming for a finished response string so the UI
 * can render it progressively (like a live AI response) rather than
 * popping in all at once. Word-chunked rather than char-chunked so
 * markdown tokens (like "**bold**") don't visibly flicker mid-render.
 * ------------------------------------------------------------------
 */

/**
 * @param {string} fullText - the complete response text
 * @param {(partial: string) => void} onChunk - called with the growing string
 * @param {() => boolean} isCancelled - returns true if streaming should stop
 * @param {object} [opts]
 * @returns {Promise<void>}
 */
export function streamText(fullText, onChunk, isCancelled = () => false, opts = {}) {
  const { minDelay = 12, maxDelay = 32, chunkSize = 3 } = opts;

  // Split preserving whitespace/newlines so markdown structure survives.
  const tokens = fullText.split(/(\s+)/);

  return new Promise((resolve) => {
    let i = 0;
    let acc = "";

    function step() {
      if (isCancelled()) {
        onChunk(fullText);
        resolve();
        return;
      }
      if (i >= tokens.length) {
        resolve();
        return;
      }

      const slice = tokens.slice(i, i + chunkSize).join("");
      acc += slice;
      i += chunkSize;
      onChunk(acc);

      const delay = minDelay + Math.random() * (maxDelay - minDelay);
      setTimeout(step, delay);
    }

    step();
  });
}

export default streamText;
