import RequisicaoIncorreta from '../erros/RequisicaoIncorreta.js';

export default async function paginar(req, res, next) {
	try {
		let {
			limite = 5,
			pagina = 1,
			ordenacao = 'titulo:1',

		} = req.query;

		const resultado = req.resultado;

		// 'campo' pode ser: '_id', titulo, editora, numeroPaginas
		// 'ordem' pode ser 1 (crescente) ou -1 (decrescente)
		const [campoOrdenacao, ordem] = ordenacao.split(':');

		limite = parseInt(limite);
		pagina = parseInt(pagina);

		if (limite > 0 && pagina > 0) {
			const resultadoPaginado = await resultado.find()
				.sort({ [campoOrdenacao]: ordem })
				.skip((pagina - 1) * limite)
				.limit(limite);
				
			res.status(200).send(resultadoPaginado);
		} else {
			next(new RequisicaoIncorreta());
		}
	} catch (erro) {
		next(erro);
	}
}