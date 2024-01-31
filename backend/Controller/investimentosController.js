const db = require('../DataBase/configDB');

exports.getAllInvestimentos = (req, res) => {
	const SQL = "SELECT * FROM Investimentos WHERE valido = 'true' ORDER BY valor DESC";
	db.all(SQL, (err, rows) =>{
		if (err)res.status(500).json({ error: 'Erro ao obter os gastos Variaveis', status: 500 })
		else res.status(200).json(rows)	
	})
}

exports.deletaInvestimentos = (req, res) => {
	const id = req.params.id;
	const SQL = "UPDATE Investimentos SET valido = ? WHERE id = ?";

	db.run(SQL, 'false', id, function (err) {
		if (err) return res.status(204).json({ error: `Registro com ID ${id} não encontrado`, status: 404 });
	});
	res.json({ message: `Registro com ID ${id} excluído com sucesso`, status: 200 });
}

exports.addInvestimentos = (req, res) => {
	try {
		const data = new Date();
		const mes = data.getMonth() + 1;
		const ano  = data.getFullYear();

		const itens = req.body;

		const novosInvestimentos = itens.map((item) => ({
			id: item.id,
			label: item.label,
			valor: item.valor,
			descricao: item.descricao,
			mes: mes,
			ano: ano
		}));

		novosInvestimentos.forEach(item => {
			const { id, label, valor, mes, ano, descricao } = item;

			const itemExiste = "SELECT id FROM Investimentos WHERE id = ?"

			db.all(itemExiste, id, (err, rows) => {

				if (rows.length > 0) {
					const atualizaItemExistente = "UPDATE Investimentos SET label = ?, valor = ?, mes = ?, ano = ?, descricao = ? WHERE id = ?"
					db.run(atualizaItemExistente, [label, valor, mes, ano, descricao, id], (err) => {
						if (err) console.log("Não foi possível atualizar os itens", err.message)
					})

				} else {
					const addNovoItem = "INSERT INTO Investimentos(label, valor, mes, ano, valido, descricao) VALUES (?,?,?,?,?, ?)"
					db.run(addNovoItem, [label, valor, mes, ano, 'true', descricao], (err) => {
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