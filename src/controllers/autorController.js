import NaoEncontrado from '../erros/NaoEncontrado.js';
import { autores } from '../models/index.js';

class AutorController {

	static listarAutores = async (req, res, next) => {
		try {
			const autoresResultado = autores.find();
			req.resultado = autoresResultado;
			next(); // chama o próximo middleware

		} catch (erro) {
			next(erro);
		}
	};

	static listarAutorPorId = async (req, res, next) => {
		try {
			const { id } = req.params;
			const autorEncontrado = await autores.findById(id);
			if (autorEncontrado !== null) {
				res.status(200).send(autorEncontrado);
			} else {
				next(new NaoEncontrado('id do autor não encontrado.'));
			}
		} catch (erro) {
			next(erro);
		}
	};

	static cadastrarAutor = async (req, res, next) => {
		try {
			const novoAutor = new autores(req.body);
			const autorCadastrado = await novoAutor.save();
			res.status(201).send(autorCadastrado.toJSON());
		} catch (erro) {
			next(erro);
		}
	};

	static atualizarAutor = async (req, res, next) => {
		try {
			const { id } = req.params;
			const autorEncontrado = await autores.findByIdAndUpdate(id, { $set: req.body });
			if (autorEncontrado !== null) {
				res.status(200).send({ mensagem: `Autor '${autorEncontrado.nome}' atualizado` });
			} else {
				next(new NaoEncontrado('Id do autor não localizado.'));
			}
		} catch (erro) {
			next(erro);
		}
	};

	static excluirAutor = async (req, res, next) => {
		try {
			const { id } = req.params;
			const autorDeletado = await autores.findByIdAndDelete(id);
			if (autorDeletado !== null) {
				res.status(200).send({ mensagem: `O autor '${autorDeletado.nome}' foi excluído.` });
			} else {
				next(new NaoEncontrado('Id do autor não localizado.'));
			}
		} catch (erro) {
			next(erro);
		}
	};

}

export default AutorController;