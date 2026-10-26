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

<<<<<<< HEAD
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
=======
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
>>>>>>> ae9acfc69f94e5fbf313b96ed244628c0405c895

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running at http://127.0.0.1:${PORT}/`);
});