const db = require('../DataBase/configDB.js');

const GetGanhos = {
	getAllGanhos: (req, res) => {
		const sql = "SELECT * FROM Ganhos";
		db.all(sql, (err, rows) => {
			if (err) {
				res.status(500).json({ error: 'Erro ao obter os ganhos', status: 500 })
			} else {
				res.json(rows)
			}


		});

	}

}

const DeletaGanhos = {
	deletaGanhos: (req, res) => {
		const id = req.params.id;
		const SQL = "DELETE FROM Ganhos WHERE id = ?";

		db.run(SQL, id, function (err) {
			if (err) {
				res.status(500).json({ error: 'Erro ao excluir o ganho', status: 500 });
			} else {
				const rowsAffected = this.changes;
				if (rowsAffected > 0) {
					res.json({ message: `Registro com ID ${id} excluído com sucesso`, status: 200 });
				} else {
					res.status(204).json({ error: `Registro com ID ${id} não encontrado`, status: 404 });
				}
			}
		});
	}
};

const AddGanhos = {
	addGanhos: (req, res) => {
		try {
			const data = new Date();
			const mes = data.getMonth() + 1;
			const ano  = data.getFullYear();
			console.log(ano)
			const itens = req.body;

			const novosGanhos = itens.map((item) => ({
				id: item.id,
				label: item.label,
				valor: item.valor,
				mes: mes
			}));

			//console.log(novosGanhos);

			novosGanhos.forEach(item => {
				const { id, label, valor, mes } = item;

				const itemExiste = "SELECT id FROM Ganhos WHERE id = ?"

				db.all(itemExiste, id, (err, rows) => {

					if (rows.length > 0) {
						const atualizaItemExistente = "UPDATE Ganhos SET label = ?, valor = ?, mes = ? WHERE id = ?"
						db.run(atualizaItemExistente, [label, valor, mes, id], (err) => {
							if (err) console.log("Não foi possível atualizar os itens", err.message)
						})
						// const atualizaGanhosHistorico = "UPDATE Ganhos_Historico SET label = ?, valor = ?, mes = ?, idGanhos = ? WHERE id = id"
						// db.run(atualizaGanhosHistorico, [label, valor, mes, id]);

					} else {
						const addNovoItem = "INSERT INTO Ganhos(label, valor, mes) VALUES (?,?,?)"
						db.run(addNovoItem, [label, valor, mes], (err, rows) => {
							if (err) console.log('Erro ao adicionar novos itens', err.message)
							//if(addNovoItem) console.log('Novos itens adicionados com sucesso', rows)
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
};


module.exports = { GetGanhos, DeletaGanhos, AddGanhos };