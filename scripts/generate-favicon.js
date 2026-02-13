
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const svgPath = path.resolve('public/favicon.svg');
const icoPath = path.resolve('public/favicon.ico');

console.log(`Converting ${svgPath} to ${icoPath}...`);

try {
    // Convert to 32x32 ICO
    await sharp(svgPath)
        .resize(32, 32)
        .toFormat('ico')
        .toFile(icoPath);

    console.log('Done! Generated favicon.ico');
} catch (err) {
    console.error('Error generating favicon.ico:', err);
    process.exit(1);
}
