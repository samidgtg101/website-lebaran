const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8'
};

const server = http.createServer((req, res) => {
  let reqUrl = decodeURI(req.url.split('?')[0]);

  // Redirect: remove .html extension from URL
  if (reqUrl.endsWith('.html')) {
    const clean = reqUrl.slice(0, -5);
    const location = (clean === '' || clean === '/index') ? '/' : clean;
    res.writeHead(301, { 'Location': location });
    res.end();
    return;
  }

  // Redirect: remove trailing slash (except root /)
  if (reqUrl.length > 1 && reqUrl.endsWith('/')) {
    res.writeHead(301, { 'Location': reqUrl.slice(0, -1) });
    res.end();
    return;
  }

  // Serve root / -> index.html
  if (reqUrl === '/') {
    const indexPath = path.join(PUBLIC_DIR, 'index.html');
    if (fs.existsSync(indexPath)) {
      const content = fs.readFileSync(indexPath);
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(content);
      return;
    }
  }

  const filePath = path.join(PUBLIC_DIR, reqUrl);

  // Serve asset files directly (.css, .js, .png, .webp, etc.)
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const content = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
    return;
  }

  // Clean URL: /blog -> blog.html, /paket/hemat -> paket/hemat.html
  const htmlPath = filePath + '.html';
  if (fs.existsSync(htmlPath)) {
    const content = fs.readFileSync(htmlPath);
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(content);
    return;
  }

  // 404
  const notFoundPath = path.join(PUBLIC_DIR, '404.html');
  if (fs.existsSync(notFoundPath)) {
    const content404 = fs.readFileSync(notFoundPath);
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(content404);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running at http://127.0.0.1:${PORT}/`);
});