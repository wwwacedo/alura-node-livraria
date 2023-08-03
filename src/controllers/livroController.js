import NaoEncontrado from '../erros/NaoEncontrado.js';
import { autores, livros } from '../models/index.js';

class LivroController {

	static listarLivros = async (req, res, next) => {
		try {
			const livrosResultado = livros.find();
			req.resultado = livrosResultado;
			next(); // chama o próximo middleware

		} catch (erro) {
			next(erro);
		}
	};

	static listarLivroPorId = async (req, res, next) => {
		try {
			const { id } = req.params;
			const livroEncontrado = await livros.findById(id, {}, {autopopulate: false}).
				populate('autor');
				
			if (livroEncontrado !== null) {
				res.status(200).send(livroEncontrado);
			} else {
				next(new NaoEncontrado('id do autor não encontrado.'));
			}
		} catch (erro) {
			next(erro);
		}
	};

	// localhost:3000/livros/busca?editora=Abril&titulo=Casa de campo
	static listarLivroPorFiltro = async (req, res, next) => {
		try {
			const busca = await processaBusca(req.query);

			if (busca !== null) {
				const livrosResultado = livros
					.find(busca);

				req.resultado = livrosResultado;
				next();

			} else {
				res.status(200).send([]);
			}

		} catch (erro) {
			next(erro);
		}
	};

	// localhost:3000/livros/busca?editora=Abril
	// static listarLivroPorEditora = async (req, res, next) => {
	// 	try {
	// 		const editora = req.query.editora;
	// 		const livroEncontrado = await livros.find({ 'editora': editora });
	// 		if (livroEncontrado !== null) {
	// 			res.status(200).send(livroEncontrado);
	// 		}
	// 	} catch (err) {
	// 		next(err);
	// 	}
	// };

	static cadastrarLivro = async (req, res, next) => {
		try {
			const novoLivro = new livros(req.body);
			const livroCadastrado = await novoLivro.save();
			res.status(201).send(livroCadastrado);
		} catch (erro) {
			next(erro);
		}
	};

	static atualizarLivro = async (req, res, next) => {
		const { id } = req.params;
		try {
			const livroEncontrado = await livros.findByIdAndUpdate(id, { $set: req.body });
			if (livroEncontrado !== null) {
				res.status(200).send({ mensagem: `O livro ${livroEncontrado.nome} atualizado` });
			} else {
				next(new NaoEncontrado('Id do livro não localizado.'));
			}
		} catch (erro) {
			next(erro);
		}
	};

	static excluirLivro = async (req, res, next) => {
		try {
			const { id } = req.params;
			const livroDeletado = await livros.findByIdAndDelete(id);
			if (livroDeletado !== null) {
				res.status(200).send({ mensagem: `O livro '${livroDeletado.titulo}' foi excluído.` });
			} else {
				next(new NaoEncontrado('Id do livro não localizado.'));
			}
		} catch (erro) {
			next(erro);
		}
	};

}

async function processaBusca(params) {
	const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = params;

	let busca = {};

	if (editora) busca.editora = editora;
	if (titulo) busca.titulo = { $regex: titulo, $options: 'i' };

	// gte = Greater Than or Equal to
	// lte = Less Than or Equal to

	// ***** SOLUÇÃO DO PROFESSOR *****
	if (minPaginas || maxPaginas) busca.numeroPaginas = {};

	if (minPaginas) busca.numeroPaginas.$gte = minPaginas;

	if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas;

	if (nomeAutor) {
		const autor = await autores.findOne({ nome: nomeAutor });

		if (autor !== null) {
			busca.autor = autor._id;
		} else {
			busca = null;
		}
	}

	// ***** MINHA SOLUÇÃO *****
	/* 
		if (minPaginas && maxPaginas) {
			busca.numeroPaginas = { $gte: minPaginas, $lte: maxPaginas };
		} else {
			if (minPaginas) busca.numeroPaginas = { $gte: minPaginas };
			if (maxPaginas) busca.numeroPaginas = { $lte: maxPaginas };
		} 
	*/

	return busca;
}


export default LivroController;