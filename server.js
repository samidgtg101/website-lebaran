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
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8'
};

const server = http.createServer((req, res) => {
  let reqUrl = decodeURI(req.url.split('?')[0]);

  // 1. Redirect /index.html or /index to /
  if (reqUrl === '/index.html' || reqUrl === '/index') {
    res.writeHead(301, { Location: '/' });
    return res.end();
  }

  // 2. Redirect *.html to clean URL (e.g. /tentang.html -> /tentang)
  if (reqUrl.endsWith('.html')) {
    const cleanUrl = reqUrl.slice(0, -5);
    res.writeHead(301, { Location: cleanUrl || '/' });
    return res.end();
  }

  // 3. Normalize root
  if (reqUrl === '/' || reqUrl === '') {
    return serveFile(path.join(PUBLIC_DIR, 'index.html'), res);
  }

  // Remove trailing slash if present (except root)
  if (reqUrl.length > 1 && reqUrl.endsWith('/')) {
    reqUrl = reqUrl.slice(0, -1);
  }

  // 4. Special cases for /blog and /paket
  if (reqUrl === '/blog') {
    return serveFile(path.join(PUBLIC_DIR, 'blog.html'), res);
  }
  if (reqUrl === '/paket') {
    return serveFile(path.join(PUBLIC_DIR, 'paket.html'), res);
  }

  // 5. Check if direct file exists (static assets: css, js, images, etc.)
  const directPath = path.join(PUBLIC_DIR, reqUrl);
  if (fs.existsSync(directPath) && !fs.statSync(directPath).isDirectory()) {
    return serveFile(directPath, res);
  }

  // 6. Check if clean URL has corresponding .html file
  const htmlPath = path.join(PUBLIC_DIR, `${reqUrl}.html`);
  if (fs.existsSync(htmlPath) && fs.statSync(htmlPath).isFile()) {
    return serveFile(htmlPath, res);
  }

  // 7. Not found -> 404.html
  serve404(res);
});

function serveFile(filePath, res) {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      return serve404(res);
    }
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
}

function serve404(res) {
  const notFoundPath = path.join(PUBLIC_DIR, '404.html');
  fs.readFile(notFoundPath, (err, content) => {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(content || '<h1>404 Not Found</h1>');
  });
}

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running at http://127.0.0.1:${PORT}/`);
});
