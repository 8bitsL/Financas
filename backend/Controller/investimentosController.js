const db = require('../DataBase/configDB');
const axios = require('axios');

exports.getAllInvestimentos = (req, res) => {
	const SQL = `
		SELECT 
			Investimentos.*, 
			Tipos_Invest.nomeInvest, 
			Tipos_Invest.simboloInvest, 
			Tipos_Invest.id AS idTipoInvest,
			Tipos_Invest.nomeReferencia 
		FROM 
			Investimentos 
		JOIN 
			Tipos_Invest ON Investimentos.idTipoInvest = Tipos_Invest.id 
		WHERE 
			valido = 'true' 
		ORDER BY 
			valor DESC`;

	db.all(SQL, (err, rows) => {
		if (err) res.status(500).json({ error: 'Erro ao obter os investimentos', status: 500 })
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
		const ano = data.getFullYear();

		const itens = req.body;
		console.log(itens);
		const novosInvestimentos = itens.map((item) => ({
			id: item.id,
			label: item.label,
			valor: item.valor,
			descricao: item.descricao,
			dataInicio: item.dataInico,
			dataFim: item.dataFim,
			idTipoInvest: item.idTipoInvest,
			mes: mes,
			ano: ano
		}));

		novosInvestimentos.forEach(item => {
			const { id, label, valor, mes, ano, descricao } = item;

			const itemExiste = "SELECT id FROM Investimentos WHERE id = ? AND valido = 'true'"

			db.all(itemExiste, id, (err, rows) => {

				if (rows.length > 0) {
					const atualizaItemExistente = "UPDATE Investimentos SET label = ?, valor = ?, descricao = ? WHERE id = ?"
					db.run(atualizaItemExistente, [label, valor, descricao, id], (err) => {
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

exports.getTiposInvest = (req, res) => {
	const SQL = "SELECT * FROM Tipos_Invest";
	db.all(SQL, (err, rows) => {
		if (err) res.status(500).json({ error: 'Erro ao obter os tipos de investimentos', status: 500 })
		else res.status(200).json(rows)
	})
}

exports.getCotacoes = async (req, res) => {
	// const apiUrl = 'https://api.hgbrasil.com/finance';

	// 	const response = await axios.get(apiUrl);

	// 	if(response.status === 200){
	// 		const cotacoesData = response.data.results;
	// 		return res.status(200).json(cotacoesData);

	// 	}else{
	// 		console.error('Erro na chamada à API de Cotações:', error.message);
	// 		return res.status(200).json(salvaDeQuebrarCotacao())
	// 	}
	// console.error(error.message)
	return res.status(200).json(salvaDeQuebrarCotacao())
}

exports.getTaxas = async (req, res) => {
	const apiUrl = 'https://brasilapi.com.br/api/taxas/v1';

		const response = await axios.get(apiUrl);

		const TaxasData = response.data;

		if(response.status === 200){
			return res.status(200).json(TaxasData);

		}else{
			console.error('Erro na chamada à API de Taxas:', error.message);
			return res.status(200).json(salvaDeQuebrarTaxa())
		}		


}

const salvaDeQuebrarCotacao = () => {
	return(
	{
		currencies: {
			'USD': {
				"name": "Dollar",
					"buy": 4.969,
						"sell": 4.969,
							"variation": -0.02
			},
			'EUR': {
				"name": "Euro",
					"buy": 5.3697,
						"sell": 5.3699,
							"variation": 0.105
			},
			'GBP': {
				"name": "Pound Sterling",
					"buy": 6.2773,
						"sell": null,
							"variation": -0.058
			},
			'ARS': {
				"name": "Argentine Peso",
					"buy": 0.006,
						"sell": null,
							"variation": 0.27
			},
			'CAD': {
				"name": "Canadian Dollar",
					"buy": 3.6874,
						"sell": null,
							"variation": -0.14
			},
			'AUD': {
				"name": "Australian Dollar",
					"buy": 3.2408,
						"sell": null,
							"variation": 0.083
			},
			'JPY': {
				"name": "Japanese Yen",
					"buy": 0.0335,
						"sell": null,
							"variation": -0.031
			},
			'CNY': {
				"name": "Renminbi",
					"buy": 0.6976,
						"sell": null,
							"variation": 0.961
			},
			'BTC': {
				"name": "Bitcoin",
					"buy": 224662.219,
						"sell": 224662.219,
							"variation": -0.885
			}
		}
	})
};

const salvaDeQuebrarTaxa = () => {
	return(
		[
			{
				"nome": "Selic",
				"valor": 11.25
			},
			{
				"nome": "CDI",
				"valor": 11.15
			},
			{
				"nome": "IPCA",
				"valor": 4.62
			}
		]
	)
}