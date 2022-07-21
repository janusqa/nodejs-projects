import http from 'http';
import { readFile } from 'fs/promises';

const server = http.createServer();

const getPage = async (page) => {
    const pageContents = await readFile(page, { encoding: 'utf8' });
    return pageContents;
};

server.on('request', async (req, res) => {
    const url = req.url;

    if (url === '/') {
        res.writeHead(200, { 'content-type': 'text/html' });
        res.write(await getPage('./navbar-app/index.html'));
        res.end();
    } else if (url === '/styles.css') {
        res.writeHead(200, { 'content-type': 'text/css' });
        res.write(await getPage('./navbar-app/styles.css'));
        res.end();
    } else if (url === '/logo.svg') {
        res.writeHead(200, { 'content-type': 'image/svg+xml' });
        res.write(await getPage('./navbar-app/logo.svg'));
        res.end();
    } else if (url === '/browser-app.js') {
        res.writeHead(200, { 'content-type': 'text/javascript' });
        res.write(await getPage('./navbar-app/browser-app.js'));
        res.end();
    } else if (url === '/about.html') {
        res.writeHead(200, { 'content-type': 'text/html' });
        res.write('<h1>about page</h1>');
        res.end();
    } else {
        res.writeHead(404, { 'content-type': 'text/html' });
        res.write('<h1>Page not found.</h1>');
        res.end();
    }
});

server.listen(5000);
