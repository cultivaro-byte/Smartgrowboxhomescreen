const http = require('http');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const BUILD_DIR = path.join(process.cwd(), 'build');
const DEFAULT_PORT = 4173;
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.ico': 'image/x-icon',
};

const ensureBuild = () => {
  if (fs.existsSync(BUILD_DIR)) {
    return;
  }

  console.log('Build output not found. Running "npm run build"...');
  execSync('npm run build', { stdio: 'inherit' });
};

const sendFile = (res, filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': contentType });
  fs.createReadStream(filePath).pipe(res);
};

const startServer = () => {
  ensureBuild();

  const port = Number.parseInt(process.env.PORT || '', 10) || DEFAULT_PORT;
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split('?')[0]);
    const safePath = urlPath === '/' ? '/index.html' : urlPath;
    const filePath = path.join(BUILD_DIR, safePath);

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      sendFile(res, filePath);
      return;
    }

    const fallbackPath = path.join(BUILD_DIR, 'index.html');
    if (fs.existsSync(fallbackPath)) {
      sendFile(res, fallbackPath);
      return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Build output missing. Run "npm run build" first.');
  });

  server.listen(port, () => {
    console.log(`Smart Grow Box is running at http://localhost:${port}`);
  });
};

module.exports = { startServer };
