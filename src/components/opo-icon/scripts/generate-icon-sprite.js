import fs from "node:fs";
import path from "node:path";
import SVGSpriter from "svg-sprite";
import { optimize } from "svgo";
import svgoConfigLine from "./svgo.config.ui.js";
import svgoConfigBrand from "./svgo.config.brand.js";

const rootDir = process.cwd();
const uiInputDir = path.join(rootDir, "src/components/opo-icon/raw-icons/ui");
const brandInputDir = path.join(
  rootDir,
  "src/components/opo-icon/raw-icons/brand",
);
const brandBrokenInputDir = path.join(
  rootDir,
  "src/components/opo-icon/raw-icons/brand-broken",
);
const outputDir = path.join(rootDir, "public/icons");

const allowedColorValues = new Set([
  "currentColor",
  "none",
  "inherit",
  "transparent",
  "context-fill",
  "context-stroke",
]);

function stripCategoryPrefix(name) {
  return name.replace(/^(ui|brand)-/, "");
}

function normalizePublicIconName(fileName) {
  return stripCategoryPrefix(path.basename(fileName, ".svg"));
}

function assertPublicIconNames(iconNames, consumerName) {
  if (!Array.isArray(iconNames)) {
    throw new TypeError(
      `${consumerName} expected iconNames to be an array, received ${Object.prototype.toString.call(iconNames)}`,
    );
  }

  const invalidNames = iconNames.filter(
    (name) => typeof name !== "string" || /^(opo-icon-|ui-|brand-)/.test(name),
  );

  if (invalidNames.length > 0) {
    throw new TypeError(
      `${consumerName} received non-public icon names: ${invalidNames.join(", ")}`,
    );
  }
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

  return /^#|^rgb\(|^rgba\(|^hsl\(|^hsla\(|^oklch\(|^oklab\(|^color\(/i.test(
    normalized,
  );
}

/**
 * Strict validation for UI icons.
 * Rules: viewBox="0 0 24 24", no width/height, no inline styles, no style/script elements, no hardcoded colors.
 */
function validateLineIcon(svgContent, filePath) {
  const errors = [];
  const svgTag = getSvgTagContent(svgContent);

  if (!svgTag) {
    errors.push("Missing <svg> root element.");
    return errors.map((e) => `${path.basename(filePath)}: ${e}`);
  }

  const viewBoxMatch = svgTag.match(/\bviewBox\s*=\s*['"]([^'"]+)['"]/i);
  if (!viewBoxMatch) {
    errors.push("Missing required viewBox on root <svg>.");
  } else if (viewBoxMatch[1].trim() !== "0 0 24 24") {
    errors.push(
      `viewBox must be "0 0 24 24" for UI icons (got "${viewBoxMatch[1].trim()}").`,
    );
  }

  if (
    /(?:^|\s)width\s*=\s*['"][^'"]+['"]/i.test(svgTag) ||
    /(?:^|\s)height\s*=\s*['"][^'"]+['"]/i.test(svgTag)
  ) {
    errors.push("Root <svg> must not define width/height.");
  }

  if (/\sstyle\s*=\s*['"][^'"]*['"]/i.test(svgContent)) {
    errors.push("Inline style attributes are not allowed.");
  }

  if (/<style\b/i.test(svgContent)) {
    errors.push("<style> elements are not allowed.");
  }

  if (/<script\b/i.test(svgContent)) {
    errors.push("<script> elements are not allowed.");
  }

  const colorAttrRegex = /(fill|stroke)\s*=\s*['"]([^'"]+)['"]/gi;
  let match;

  while ((match = colorAttrRegex.exec(svgContent)) !== null) {
    if (hasHardcodedColor(match[2])) {
      errors.push(
        `Hardcoded ${match[1]} color "${match[2]}" is not allowed. Use currentColor/none.`,
      );
    }
  }

  return errors.map((e) => `${path.basename(filePath)}: ${e}`);
}

/**
 * Flexible validation for brand icons (logos, social).
 * Rules: viewBox required (any size), no width/height on root, no script elements.
 */
function validateBrandIcon(svgContent, filePath) {
  const errors = [];
  const svgTag = getSvgTagContent(svgContent);

  if (!svgTag) {
    errors.push("Missing <svg> root element.");
    return errors.map((e) => `${path.basename(filePath)}: ${e}`);
  }

  if (!/\bviewBox\s*=\s*['"][^'"]+['"]/i.test(svgTag)) {
    errors.push("Missing required viewBox on root <svg>.");
  }

  if (
    /(?:^|\s)width\s*=\s*['"][^'"]+['"]/i.test(svgTag) ||
    /(?:^|\s)height\s*=\s*['"][^'"]+['"]/i.test(svgTag)
  ) {
    errors.push("Root <svg> must not define width/height.");
  }

  if (/<script\b/i.test(svgContent)) {
    errors.push("<script> elements are not allowed.");
  }

  return errors.map((e) => `${path.basename(filePath)}: ${e}`);
}

function buildSpriter(outputFile) {
  return new SVGSpriter({
    dest: outputDir,
    mode: {
      symbol: {
        dest: ".",
        sprite: outputFile,
      },
    },
    shape: {
      id: {
        generator: (name) =>
          `opo-icon-${stripCategoryPrefix(path.basename(name, ".svg"))}`,
      },
    },
    svg: {
      xmlDeclaration: false,
      doctypeDeclaration: false,
    },
  });
}

function compileSpriter(spriter, outputPath, label) {
  return new Promise((resolve, reject) => {
    spriter.compile((error, result) => {
      if (error) return reject(error);
      fs.writeFileSync(outputPath, result.symbol.sprite.contents);
      console.log(`✅ ${label} → ${outputPath}`);
      resolve();
    });
  });
}

function writeIconsManifest({ iconNames, outputDir }) {
  assertPublicIconNames(iconNames, "writeIconsManifest");

  const manifestPath = path.join(outputDir, "icons.manifest.json");
  const manifest = {
    icons: iconNames.map((name) => ({ name })),
  };
  const manifestContent = `${JSON.stringify(manifest, null, 2)}\n`;

  fs.writeFileSync(manifestPath, manifestContent);
  console.log(`✅ Icon manifest → ${manifestPath}`);
}

function writeIconNameTypes({ iconNames, outputDir }) {
  assertPublicIconNames(iconNames, "writeIconNameTypes");

  const typePath = path.join(outputDir, "icon-name.d.ts");
  const unionLines =
    iconNames.length > 0
      ? iconNames.map((name) => `  | "${name}"`).join("\n")
      : "  | never";

  const content = [
    "// Auto-generated by generate-icon-sprite.js. Do not edit manually.",
    "export type IconName =",
    unionLines,
    ";",
    "",
  ].join("\n");

  fs.writeFileSync(typePath, content);
  console.log(`✅ Icon types → ${typePath}`);
}

function validateIcons(iconFiles, globalNameRegistry) {
  const errors = [];
  const seenNames = new Set();
  const seenIds = new Set();
  // For global collisions, store all involved paths
  const globalCollisions = new Map();

  iconFiles.forEach((filePath) => {
    const fileName = path.basename(filePath, ".svg");
    const publicName = normalizePublicIconName(fileName);
    const svgContent = fs.readFileSync(filePath, "utf8");

    // Check for empty SVGs
    if (!svgContent.trim()) {
      errors.push(`${fileName}: SVG file is empty.`);
      return;
    }

    // Check for valid <svg> root element
    if (!/<svg\b[^>]*>/i.test(svgContent)) {
      errors.push(`${fileName}: Missing <svg> root element.`);
      return;
    }

    // Check for duplicate names in same folder
    if (seenNames.has(publicName)) {
      errors.push(
        `${fileName}: Duplicate public icon name "${publicName}" in the same folder.`,
      );
    } else {
      seenNames.add(publicName);
    }

    // Check for duplicate names across folders (ui/brand)
    if (globalNameRegistry.has(publicName)) {
      // Store all involved paths
      if (!globalCollisions.has(publicName)) {
        globalCollisions.set(publicName, [globalNameRegistry.get(publicName)]);
      }
      globalCollisions.get(publicName).push(path.relative(rootDir, filePath));
    } else {
      globalNameRegistry.set(publicName, path.relative(rootDir, filePath));
    }

    // Check for valid prefixes
    if (!/^ui-|^brand-/.test(fileName)) {
      errors.push(
        `${fileName}: Invalid prefix. Must start with 'ui-' or 'brand-'.`,
      );
    }

    // Check for duplicate IDs within the sprite
    const idMatches = svgContent.match(/id=['"]([^'"]+)['"]/g);
    if (idMatches) {
      idMatches.forEach((id) => {
        const cleanId = id.replace(/id=['"]|['"]$/g, "");
        if (seenIds.has(cleanId)) {
          errors.push(`${fileName}: Duplicate ID '${cleanId}' in sprite.`);
        } else {
          seenIds.add(cleanId);
        }
      });
    }
  });

  // If there are global collisions, show a multiline error and abort.
  if (globalCollisions.size > 0) {
    const msg = Array.from(globalCollisions.entries())
      .map(
        ([name, paths]) =>
          `Duplicate public icon name "${name}" found in:\n- ${paths.join("\n- ")}\n\nChoose one canonical public name or rename one icon before publishing.`,
      )
      .join("\n\n");
    console.error("\nValidation errors:\n" + msg);
    process.exit(1);
  }

  if (errors.length > 0) {
    console.error("\nValidation errors:\n", errors.join("\n"));
    process.exit(1);
  }
}

async function processFolder(
  inputDir,
  validate,
  svgoConfig,
  outputFileName,
  label,
  expectedPrefix,
  globalNameRegistry,
) {
  if (!fs.existsSync(inputDir)) {
    fs.mkdirSync(inputDir, { recursive: true });
  }

  const files = fs
    .readdirSync(inputDir)
    .filter((file) => file.endsWith(".svg"))
    .sort((a, b) => a.localeCompare(b));

  if (files.length === 0) {
    console.log(`⚠️  No SVGs found in ${path.relative(rootDir, inputDir)}`);
    const emptySprite =
      '<svg xmlns="http://www.w3.org/2000/svg" style="display: none;"></svg>';
    fs.writeFileSync(path.join(outputDir, outputFileName), emptySprite);
    return;
  }

  // Validate icons before processing
  validateIcons(
    files.map((file) => path.join(inputDir, file)),
    globalNameRegistry,
  );

  const spriter = buildSpriter(outputFileName);
  const globalRegistry = new Set();

  for (const file of files) {
    const filePath = path.join(inputDir, file);
    const svgContent = fs.readFileSync(filePath, "utf8");
    const validationErrors = validate(svgContent, filePath);

    if (validationErrors.length > 0) {
      console.error("\nValidation errors:\n", validationErrors.join("\n"));
      process.exit(1);
    }

    const optimized = optimize(svgContent, { path: filePath, ...svgoConfig });
    spriter.add(filePath, null, optimized.data);
    globalRegistry.add(normalizePublicIconName(file));
  }

  await compileSpriter(spriter, path.join(outputDir, outputFileName), label);
  return [...globalRegistry].sort((a, b) => a.localeCompare(b));
}

async function processFolderRaw(
  inputDir,
  outputFileName,
  label,
  expectedPrefix,
) {
  if (!fs.existsSync(inputDir)) {
    fs.mkdirSync(inputDir, { recursive: true });
  }

  const files = fs
    .readdirSync(inputDir)
    .filter((file) => file.endsWith(".svg"))
    .sort((a, b) => a.localeCompare(b));

  if (files.length === 0) {
    console.log(`⚠️  No SVGs found in ${path.relative(rootDir, inputDir)}`);
    const emptySprite =
      '<svg xmlns="http://www.w3.org/2000/svg" style="display: none;"></svg>';
    fs.writeFileSync(path.join(outputDir, outputFileName), emptySprite);
    return;
  }

  console.log(
    `🔨 ${label}: processing ${files.length} icons (raw, no sanitize/no normalize)…`,
  );

  const spriter = buildSpriter(outputFileName);

  for (const file of files) {
    const filePath = path.join(inputDir, file);
    const prefixError = validateFilenamePrefix(file, expectedPrefix);
    if (prefixError) {
      console.error(`❌ ${file}: ${prefixError}`);
      process.exit(1);
    }

    const content = fs.readFileSync(filePath, "utf8");
    spriter.add(filePath, file, content);
  }

  await compileSpriter(spriter, path.join(outputDir, outputFileName), label);
}

async function generateSprites() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const globalNameRegistry = new Map();

  const uiIconNames =
    (await processFolder(
      uiInputDir,
      validateLineIcon,
      svgoConfigLine,
      "opo-sprite-ui.svg",
      "UI icons",
      "ui",
      globalNameRegistry,
    )) ?? [];

  await processFolder(
    brandInputDir,
    validateBrandIcon,
    svgoConfigBrand,
    "opo-sprite-brand.svg",
    "Brand icons",
    "brand",
    globalNameRegistry,
  );

  await processFolderRaw(
    brandBrokenInputDir,
    "opo-sprite-brand-broken.svg",
    "Brand broken icons",
    "brand",
  );

  writeIconsManifest({
    iconNames: uiIconNames,
    outputDir,
  });
  writeIconNameTypes({
    iconNames: uiIconNames,
    outputDir,
  });
}

generateSprites().catch((err) => {
  console.error("❌ Error general:", err);
  process.exit(1);
});
