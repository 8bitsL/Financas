const db = require('../DataBase/configDB');

exports.getAllGanhos = (req, res) => {
	const sql = "SELECT * FROM Ganhos";
	db.all(sql, (err, rows) => {
		if (err)res.status(500).json({ error: 'Erro ao obter os ganhos', status: 500 })
		else res.status(200).json(rows)		
	});

}

exports.deletaGanhos = (req, res) => {
	const id = req.params.id;
	const SQL = "UPDATE Ganhos SET valido = ? WHERE id = ?";

	db.run(SQL, 'false', id, function (err) {
		if (err) return res.status(204).json({ error: `Registro com ID ${id} não encontrado`, status: 404 });
	});
	res.json({ message: `Registro com ID ${id} excluído com sucesso`, status: 200 });
}

exports.addGanhos = (req, res) => {
	try {
		const data = new Date();
		const mes = data.getMonth() + 1;
		const ano  = data.getFullYear();

		const itens = req.body;

		const novosGanhos = itens.map((item) => ({
			id: item.id,
			label: item.label,
			valor: item.valor,
			mes: mes,
			ano: ano
		}));

		console.log(novosGanhos)

		novosGanhos.forEach(item => {
			const { id, label, valor, mes, ano } = item;

			const itemExiste = "SELECT id FROM Ganhos WHERE id = ?"

			db.all(itemExiste, id, (err, rows) => {

				if (rows.length > 0) {
					const atualizaItemExistente = "UPDATE Ganhos SET label = ?, valor = ?, mes = ?, ano = ? WHERE id = ?"
					db.run(atualizaItemExistente, [label, valor, mes, ano, id], (err) => {
						if (err) console.log("Não foi possível atualizar os itens", err.message)
					})

				} else {
					const addNovoItem = "INSERT INTO Ganhos(label, valor, mes, ano, valido) VALUES (?,?,?,?,?)"
					db.run(addNovoItem, [label, valor, mes, ano, 'true'], (err) => {
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
