const db = require('../DataBase/configDB');

exports.getAllGastosVariaveis = (req, res) => {
	const SQL = "SELECT * FROM Gastos_Variaveis WHERE valido = 'true' ORDER BY pago DESC";
	db.all(SQL, (err, rows) =>{
		if (err)res.status(500).json({ error: 'Erro ao obter os gastos Variaveis', status: 500 })
		else res.status(200).json(rows)	
	})
}

exports.deletaGastosVariaveis = (req, res) => {
	const id = req.params.id;
	const SQL = "UPDATE Gastos_Variaveis SET valido = ? WHERE id = ?";

	db.run(SQL, 'false', id, function (err) {
		if (err) return res.status(204).json({ error: `Registro com ID ${id} não encontrado`, status: 404 });
	});
	res.json({ message: `Registro com ID ${id} excluído com sucesso`, status: 200 });
}

exports.addGastosVariaveis = (req, res) => {
	try {
		const data = new Date();
		const mes = data.getMonth() + 1;
		const ano  = data.getFullYear();

		const itens = req.body;

		const novosGastosVariaveis = itens.map((item) => ({
			id: item.id,
			label: item.label,
			valor: item.valor,
			pago: String(item.pago),
			mes: mes,
			ano: ano
		}));

		novosGastosVariaveis.forEach(item => {
			const { id, label, valor, mes, ano, pago } = item;

			const itemExiste = "SELECT id FROM Gastos_Variaveis WHERE id = ?"

			db.all(itemExiste, id, (err, rows) => {

				if (rows.length > 0) {
					const atualizaItemExistente = "UPDATE Gastos_Variaveis SET label = ?, valor = ?, mes = ?, ano = ?, pago = ? WHERE id = ?"
					db.run(atualizaItemExistente, [label, valor, mes, ano, pago, id], (err) => {
						if (err) console.log("Não foi possível atualizar os itens", err.message)
					})

				} else {
					const addNovoItem = "INSERT INTO Gastos_Variaveis(label, valor, mes, ano, valido, pago) VALUES (?,?,?,?,?, ?)"
					db.run(addNovoItem, [label, valor, mes, ano, 'true', pago], (err) => {
						if (err) console.log('Erro ao adicionar novos itens', err.message)
					})
				}
			})

		});

		res.status(201).json({ message: 'Registros inseridos/atualizados com sucesso', status: 201 });

	} catch (error) {
		console.error('Erro ao inserir/atualizar registros:', error.message);
		res.status(500).json({ error: 'Erro ao inserir/atualizar registros', status: 500 });
	}
}