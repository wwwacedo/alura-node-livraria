import express from 'express';
import livros from './livrosRoutes.js';
import autores from './autoresRoutes.js';
import manipuladorDeErros from '../middlewares/manipuladorDeErros.js';
import manipulador404 from '../middlewares/manipulador404.js';

const routes = (app) => {
	app.route('/', ).get((_, res) => {
		res.status(200).send({titulo: 'Curso de Node'});  
	});

	/*
	A documentação do Express diz que uma aplicação Express é essencialmente composta pela execução de várias funções middlewares em resposta às requisições!

	Mas o que é um middleware?

	Um middleware do Express é uma função que é executada em toda requisição para a API ou em determinadas requisições.

	Ou seja, os métodos de controladores também são middlewares do Express, pois quando uma requisição é feita para uma determinada rota da API, esses métodos executam um determinado código (recebem parâmetros da requisição, acessam o banco de dados, etc) e devolvem uma resposta para o cliente.

	Para registrar um middleware que é executado em todas as requisições para a API, independente da rota ou do método HTTP, utilizamos o método app.use()

	A ordem em que os middlewares são registrados na aplicação é importante. Se um middleware enviar uma resposta para o cliente (método send), o fluxo da requisição encerra nessa resposta, e quaisquer middlewares registrados depois desse não serão executados. Afinal, apenas uma resposta pode ser enviada para cada requisição.
	*/
	app.use(
		express.json(),
		livros,
		autores,
		manipulador404,
		manipuladorDeErros
	);
};

export default routes;