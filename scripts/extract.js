import { execSync } from 'child_process';
import { existsSync } from 'fs';

const zipPath = '/vercel/share/v0-project/web.zip';
const outputDir = '/vercel/share/v0-project';

if (existsSync(zipPath)) {
  console.log('Extracting web.zip...');
  execSync(`unzip -o ${zipPath} -d ${outputDir}`, { stdio: 'inherit' });
  console.log('Extraction complete!');
} else {
  console.log('web.zip not found');
}
