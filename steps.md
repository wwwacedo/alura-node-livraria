1. Configurando o ESLint:
```
	npm init @eslint/config
```

2. Para aplicar o ESLint manualmente:
```
	npx eslint ./src --fix
```

3. Para configurar o ESLint globalmente:
- CMD + SHIFT + P no VSCode
- na barra de procura, digitar 'settings' (mantendo o sinal de '>' no início da linha)
- encontrar a opção 'Preferences: Open User Settings (JSON)'
- adicionar o código abaixo:

```
	"editor.codeActionsOnSave": {
		"source.fixAll.eslint": true
	},
```

4. Tornando o comportamento do `populate` padrão com o recurso `auto-populate` do Mongoose
<br/>
- instalar o plugin
```
	npm install mongoose-autopopulate
```
<br/>

- importá-lo no início do arquivo `Livros.js`
```
	import autopopulate from "mongoose-autopopulate";
```
<br/>

- identificar a linha
```
	const livros= mongoose.model("livros", livroSchema);
```
<br/>

- adicionar o seguinte acima desta linha anterior 
```
	livroSchema.plugin(autopopulate);
```
<br/>

- adicionar a propriedade `autopopulate: true` no campo do autor
```
    autor: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "autores",
		required: [true, "O(a) autor(a) é obrigatório"],
		autopopulate: true // propriedade adicionada
    },
```
<br/>

- se quisermos que uma rota específica não seja populada (ex.: desativar o `autopopulate` no método `findById`)
```
	const livroResultado = await livros.findById(id, {}, { autopopulate: false });
```
*O terceiro parâmetro é um **objeto de configurações**, e nele passamos a propriedade autopopulate com o valor **false***
<br/>
- para fazermos uma população mais específica nesse método
```
    const livroResultado = await livros
        .findById(id, {}, { autopopulate: false })
        .populate("autor", "nome");
```
<br/>

- para configurar o `autopopulate`:
```
    autor: 
	{
		type: mongoose.Schema.Types.ObjectId,
		ref: "autores",
		required: [true, "O(a) autor(a) é obrigatório"],
		autopopulate: { select: "nome" }
	}
```
*Ou seja, o padrão agora é autopopular o campo autor apenas com o seu nome*
<br/>

-   modificar o método `populate` para mostrar todas as informações do autor
```
	const livroResultado = await livros
		.findById(id, {}, { autopopulate: false })
		.populate("autor"); 
```
*Removemos o segundo parâmetro "nome", e agora essa população mostra todas as informações do autor*
