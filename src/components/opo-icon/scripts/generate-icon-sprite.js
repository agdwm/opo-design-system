import fs from 'node:fs';
import path from 'node:path';
import SVGSpriter from 'svg-sprite';
import { optimize } from 'svgo';
import svgoConfigLine from './svgo.config.js';
import svgoConfigBrand from './svgo.config.brand.js';

const rootDir = process.cwd();
const uiInputDir = path.join(rootDir, 'src/components/opo-icon/raw-icons/ui');
const brandInputDir = path.join(rootDir, 'src/components/opo-icon/raw-icons/brand');
const outputDir = path.join(rootDir, 'src/components/opo-icon/sprites');

const allowedColorValues = new Set(['currentColor', 'none', 'inherit', 'transparent', 'context-fill', 'context-stroke']);

function stripCategoryPrefix(name) {
  return name.replace(/^(ui|brand)-/, '');
}

function validateFilenamePrefix(fileName, expectedPrefix) {
  const requiredPrefix = `${expectedPrefix}-`;
  if (!fileName.startsWith(requiredPrefix)) {
    return `Filename must start with "${requiredPrefix}".`;
  }
  return null;
}

function getSvgTagContent(svgContent) {
  const match = svgContent.match(/<svg\b([^>]*)>/i);
  return match ? match[1] : null;
}

function hasHardcodedColor(value) {
  const normalized = value.trim();

  if (allowedColorValues.has(normalized)) {
    return false;
  }

  if (/^url\(#.*\)$/i.test(normalized)) {
    return false;
  }

  return /^#|^rgb\(|^rgba\(|^hsl\(|^hsla\(|^oklch\(|^oklab\(|^color\(/i.test(normalized);
}

/**
 * Strict validation for UI icons.
 * Rules: viewBox="0 0 24 24", no width/height, no inline styles, no style/script elements, no hardcoded colors.
 */
function validateLineIcon(svgContent, filePath) {
  const match = svgContent.match(/<svg\b([^>]*)>/i);
  if (!match) {
    return `No SVG tag found in file: ${filePath}`;
  }

  const { viewBox, width, height, style, script } = match[1].match(/viewBox=([^>]*)|width=([^>]*)|height=([^>]*)|style=([^>]*)|script=([^>]*)/g);

  if (viewBox !== '0 0 24 24') {
    return `viewBox must be "0 0 24 24"`;
  }

  if (width || height) {
    return `width/height must not be specified`;
  }

  if (style || script) {
    return `style/script must not be specified`;
  }

  if (hasHardcodedColor(svgContent)) {
    return `Hardcoded color found`;
  }

  return null;
}
