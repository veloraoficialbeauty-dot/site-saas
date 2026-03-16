import { execSync } from 'child_process';

const zipUrl = 'https://v0chat-agent-data-prod.s3.us-east-1.amazonaws.com/vm-binary/4msP8zM0Rgl/300cf4008a4b9e21e572235e6cbd2ed39a5ac48fa9f2dc08f6bccd608cdad185.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA52KF4VHQDTZ5RDMT%2F20260316%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260316T161418Z&X-Amz-Expires=3600&X-Amz-Signature=78e9179751ddc5f43256bc939c3684b9b40d41319a60174ed6ce9ac9d847a684&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject';

console.log('Downloading and extracting...');
try {
  execSync(`curl -L -o /tmp/web.zip "${zipUrl}"`, { stdio: 'inherit' });
  execSync('unzip -o /tmp/web.zip', { stdio: 'inherit', cwd: process.cwd() });
  console.log('Extraction complete!');
} catch (error) {
  console.error('Error:', error.message);
}
