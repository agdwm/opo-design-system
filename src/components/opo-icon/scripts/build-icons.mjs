// scripts/generate-icon-sprite.js
import fs from 'node:fs';
import path from 'node:path';
import SVGSpriter from 'svg-sprite';
import { optimize } from 'svgo';
import svgoConfig from '../svgo.config.js';

const rootDir = process.cwd();
const inputDir = path.join(rootDir, 'src/components/opo-icon/raw-icons');
const outputDir = path.join(rootDir, 'src/components/opo-icon/sprites');
const outputFile = path.join(outputDir, 'opo-sprite.svg');

async function generateSprite() {
  // Crear carpetas si no existen
  if (!fs.existsSync(inputDir)) {
    fs.mkdirSync(inputDir, { recursive: true });
  }
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const files = fs
    .readdirSync(inputDir)
    .filter((file) => file.endsWith('.svg'))
    .sort((a, b) => a.localeCompare(b));

  if (files.length === 0) {
    console.log('⚠️  No se encontraron archivos SVG en src/components/opo-icon/raw-icons');
    const emptySprite = '<svg xmlns="http://www.w3.org/2000/svg" style="display: none;"></svg>';
    fs.writeFileSync(outputFile, emptySprite);
    return;
  }

  console.log(`🔨 Generando sprite con ${files.length} iconos...`);

  const spriter = new SVGSpriter({
    dest: outputDir,
    mode: {
      symbol: {
        dest: '.',
        sprite: 'opo-sprite.svg',
      },
    },
    shape: {
      id: {
        generator: (name) => `opo-icon-${path.basename(name, '.svg')}`,
      },
    },
    svg: {
      xmlDeclaration: false,