/**
 * Browser Mode tests intentionally load the generated Stencil bundle
 * instead of importing component source files directly.
 *
 * This ensures tests exercise the same artifact consumed by external
 * applications, including:
 *
 * - custom element registration
 * - generated runtime code
 * - bundling output
 * - Shadow DOM behaviour in a real browser
 *
 * Because the browser suite depends on the generated bundle,
 * the project must be rebuilt before running tests when component
 * source files change.
 */
await import("./dist/landing-challenge/landing-challenge.esm.js");

export {};
