import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the uploads directory path
const uploadsDir = path.join(__dirname, '../../uploads/user');

// Create the directory if it doesn't exist
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log(`Created uploads directory at: ${uploadsDir}`);
} else {
  console.log(`Uploads directory already exists at: ${uploadsDir}`);
}

// Ensure the directory has the correct permissions
try {
  fs.chmodSync(uploadsDir, 0o755);
  console.log('Set correct permissions for uploads directory');
} catch (error) {
  console.error('Error setting permissions:', error);
}

// Create a test file to verify write permissions
const testFile = path.join(uploadsDir, 'test.txt');
try {
  fs.writeFileSync(testFile, 'Test file to verify write permissions');
  console.log('Successfully wrote test file');
  fs.unlinkSync(testFile);
  console.log('Successfully removed test file');
} catch (error) {
  console.error('Error testing write permissions:', error);
}

console.log('Setup complete!');
