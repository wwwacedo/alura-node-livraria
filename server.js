import 'dotenv/config';
import app from './src/app.js';
import db from './src/config/dbConnect.js';

const port = process.env.PORT || 3000;

db.on('error', console.log.bind(console, 'Erro de conexão:'));
db.once('open', () => {
	console.log('Conexão com o banco de dados realizada com sucesso!');
});

app.listen(port, () => {
	console.log(`Servidor escutando na em http://localhost:${port}`);
});

