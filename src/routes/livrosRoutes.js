import express from 'express';
import LivroController from '../controllers/livroController.js';
import paginar from '../middlewares/paginar.js';

const router = express.Router();

// rotas organizadas da mais específica para a mais genérica
router
	.get('/livros', LivroController.listarLivros, paginar)
	.get('/livros/busca', LivroController.listarLivroPorFiltro, paginar)
	.get('/livros/:id', LivroController.listarLivroPorId)
	.post('/livros', LivroController.cadastrarLivro)
	.put('/livros/:id', LivroController.atualizarLivro)
	.delete('/livros/:id', LivroController.excluirLivro);

	
export default router;