import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

const livroSchema = new mongoose.Schema({
	id: { type: String },
	titulo: {
		type: String,
		required: [true, 'O título do livro é obrigatório.'],
	},
	autor: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'autores',
		required: [true, 'O(A) autor(a) do livro é obrigatório.'],
		autopopulate: {select: 'nome'}

	},
	editora: {
		type: String,
		required: [true, 'A editora do livro é obrigatória.'],
		enum: {
			values: ['Casa do Código', 'Alura', 'Globo Livros'],
			message: 'A editora {VALUE} fornecida não é um valor permitido.'
		}
	},
	numeroPaginas: {
		type: Number,
		// min: [10, 'O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}'],
		// max: [5000, 'O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}'],
		validate: {
			validator: (valor) => {
				return valor >= 10 && valor <= 5000;
			},
			message: 'O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}'
		}
	}
});

livroSchema.plugin(autopopulate);
const livros = mongoose.model('livros', livroSchema);

export default livros;