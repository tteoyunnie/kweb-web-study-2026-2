const http = require('http');

const server = http.createServer((req, res) => {
	if (req.url === '/hello') {
		res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
		res.end('Hello, World!');
		return;
	}

	if (req.url === '/bye') {
		res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
		res.end('Goodbye, World!');
		return;
	}

	res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
	res.end('Not Found');
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
