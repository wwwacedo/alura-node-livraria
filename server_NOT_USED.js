const http = require('node:http');
const port = 3000;
const rotas = {
	'/': 'Curso de Node.js',
	'/livros': 'Entrei na pagina de livros',
	'/autores': 'Listagem de autores',
	'/editoras': 'Listagem de editoras',
	'/sobre': 'info sobre o projeto'
};

const server = http.createServer((req, res) => {
	// res.statusCode = 200;
	// res.setHeader('Content-Type', 'text/plain');
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end(rotas[req.url]);
});

server.listen(port, () => {
	console.log(`Servidor escutando na em http://localhost:${port}`);
});