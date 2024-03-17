import React, { useState, useEffect } from 'react';
import { Box, Paper, TextField, InputAdornment, IconButton, List, ListItem, Card, CardHeader, Divider, CardActions, Tooltip } from '@mui/material';
import { BotaoAdicionarNovoInput, BotaoSalvar, Titulo, ValorTotal, AddInvestimento, ModalConfirmaDelete, EditInputInvest } from '../Complementos';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { getInvestimentos, deletaInvestimentos, addInvestimentos, tiposInvestimentos, getTaxas, getCotacoes } from '../../api/investimentosApi'

const styles = {
	boxPai: {
		display: 'flex',
		flexDirection: 'column',
		width: '99%',
		height: '75%',
		mb: 1,
		ml: 1,
		mr: 1,
		bgcolor: '#252724',
		borderRadius: '10px'
	},
	container: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		flex: 1,
	},
	boxInputs: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		width: '100%',
	},
	paperInputs: {
		p: 1.3,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		minWidth: 300
	},

	cardInputs: {
		bgcolor: '#252724',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	}

}
//TENHO QUE DAR UM JEITO AGORA DE PEGAR AS COTAÇÕES/TAXAS, EXIBIR E SALVAR NO BANCO TAMBÉM
const Investimentos = () => {
	const [valores, setValores] = useState();
	const [saldoTotal, setSaldoTotal] = useState('');
	const [forceUpdate, setForceUpdate] = useState(false);
	const [dadosParaEditarInvestimento, setDadosParaEditarInvestimento] = useState({ open: false })
	const [dadosParaAddInvestimento, setDadosParaAddInvestimento] = useState({ open: false })
	const [dadosParaDeletarInput, setDadosParaDeletarInput] = useState({ open: false, label: '', id: '' })
	const [tiposInvest, setTiposInvest] = useState();
	const [cotacoes, setCotacoes] = useState();
	const [taxas, setTaxas] = useState();

	const handleValores = (event, index) => {

		const newValue = event.target.value.replace(/[^0-9.]/g, '');

		setValores(prevValores => prevValores.map((item, i) => (i === index ? { ...item, valor: newValue } : item)));
	};

	const salvaDados = async () => {

		// await addInvestimentos(valores);
		// setForceUpdate(prevState => !prevState);
		console.log(valores)
	}

	/* AQUI COMEÇA A CRIÇÃO DE UM NOVO INPUT */

	const abreAddNovoInput = () => setDadosParaAddInvestimento({ open: true })

	const addValoresNovoInput = (value, campo) => {

		if (campo === 'idTipoInvest') {
			tiposInvest.forEach((tipo) => {
				if (tipo.id === value) {
					setDadosParaAddInvestimento({
						...dadosParaAddInvestimento,
						idTipoInvest: tipo.id,
						simboloInvest: tipo.simboloInvest,
						nomeInvest: tipo.nomeInvest,
						nomeReferencia: tipo.nomeReferencia
					});
				}
			});
		} else {
			setDadosParaAddInvestimento((prevState) => ({
				...prevState,
				[campo]: value
			}));
		}
	}

	const salvaNovoInput = () => {

		const maiorID = Math.max(...valores.map(item => item.id), 0);

		const novoId = Number(maiorID + 1 || 0)

		const novosValores = [...valores, { id: novoId, ...dadosParaAddInvestimento }];

		setValores(novosValores);

		fechaAddNovoInput();

	}
	const fechaAddNovoInput = () => setDadosParaAddInvestimento({ open: false })

	/* AQUI TERMINA A CRIÇÃO DE UM NOVO INPUT */

	/* AQUI COMEÇA A PARTE RESPONSÁVEL POR EDITAR O LABEL */

	const AbreEditorInvest = (item) => { setDadosParaEditarInvestimento({ open: true, ...item }) }

	const NovoInvest = (value, campo) => {

		setDadosParaEditarInvestimento((prevState) => ({
			...prevState,
			[campo]: value
		}));
	}

	const EditaInvest = () => {

		setValores((prevValores) => prevValores.map((valor) => valor.id === dadosParaEditarInvestimento.id ? { ...valor, ...dadosParaEditarInvestimento } : valor));

		fechaEditorInvest();
	}

	const fechaEditorInvest = () => setDadosParaEditarInvestimento({ open: false })

	/* AQUI TERMINA A PARTE RESPONSÁVEL POR EDITAR O LABEL */

	/*AQUI COMEÇA A PARTE QUE DELETA O INPUT*/

	const abreModalDeleteInput = (label, id) => setDadosParaDeletarInput({ open: true, label: label, id: id });

	const fechaModalDeleteInput = () => setDadosParaDeletarInput({ open: false });

	const deletaInput = async (id) => {

		const deletaInput = valores.filter(item => item.id !== id);

		setValores(deletaInput)

		await deletaInvestimentos(id)

		fechaModalDeleteInput();
	}

	/*AQUI TERMINA A PARTE QUE DELETA O INPUT*/


	useEffect(() => {
		const pegaInvestimentos = async () => {

			const response = await getInvestimentos();

			const dados = response.data;

			setValores(dados);

		};

		const getTiposInvest = async () => {
			const result = await tiposInvestimentos();

			const dados = result.data

			setTiposInvest(dados);
		};

		const pegaTaxas = async () => {
			const result = await getTaxas();

			const dados = result.data

			setTaxas(dados)
		};

		const pegaCotacoes = async () => {
			const result = await getCotacoes();

			const dados = result.data

			setCotacoes(dados)
		};

		pegaCotacoes();

		pegaTaxas();

		getTiposInvest();

		pegaInvestimentos();
	}, [forceUpdate]);


	useEffect(() => {

		if (valores) {
			const somaValores = valores.reduce((total, item) => total + parseFloat(item.valor || 0), 0);
			setSaldoTotal(somaValores);
		}

	}, [valores])

	return (
		<>
			<Box sx={styles.boxPai}>
				<Titulo texto={'Informe aqui os seus investimentos'} />
				<Box sx={styles.container}>

					{valores &&
						<List sx={styles.boxInputs}>
							{valores.map((item, index) => (
								<InvestimentosItem
									key={index}
									item={item}
									index={index}
									handleValores={handleValores}
									AbreEditorInvest={AbreEditorInvest}
									abreModalDeleteInput={abreModalDeleteInput}
									tiposInvest={tiposInvest}
									cotacoes={cotacoes}
									taxas={taxas}
								/>
							))}
						</List>
					}

					<Box sx={{ alignSelf: 'self-end', p: 1, mr: 1 }}>

						<BotaoAdicionarNovoInput title={"Adicionar investimentos"} click={abreAddNovoInput} />

						<ValorTotal saldoTotal={saldoTotal} title="Investimentos" />

					</Box>

					<BotaoSalvar texto={'Salvar seus investimentos'} salvaDados={salvaDados} />
				</Box>
			</Box>

			<EditInputInvest
				title={'Edite o seu investimento'}
				dadosParaEditarInvestimento={dadosParaEditarInvestimento}
				fechaEditorInvest={fechaEditorInvest}
				EditaInvest={EditaInvest}
				NovoInvest={NovoInvest}
			/>

			<AddInvestimento
				title={'investimento'}
				dadosParaAddInvestimento={dadosParaAddInvestimento}
				addValoresNovoInput={addValoresNovoInput}
				salvaNovoInput={salvaNovoInput}
				fechaAddNovoInput={fechaAddNovoInput}
				tiposInvest={tiposInvest}
			/>

			<ModalConfirmaDelete
				dadosParaDeletarInput={dadosParaDeletarInput}
				fechaModalDeleteInput={fechaModalDeleteInput}
				deletaInput={deletaInput}
			/>

		</>
	);
}

const InvestimentosItem = ({ item, index, handleValores, AbreEditorInvest, abreModalDeleteInput, tiposInvest, cotacoes, taxas }) => {

	const getInfoTaxasECotacoes = () => {
		const taxa = taxas?.find(taxa => taxa?.nome === item.nomeReferencia);
		const cotacao = cotacoes?.currencies[item.nomeReferencia]?.buy;

		if (cotacao !== undefined) {
			return cotacao.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
		} else if (taxa !== undefined) {
			return `${taxa.valor}%`;
		} else {
			return null;
		}
	};

	const calcularRendimento = () => {
		const dataInicio = new Date(item.dataInicio);
		const dataFim = new Date(item.dataFim);

		const diasInvestidos = Math.ceil((dataFim - dataInicio) / (1000 * 60 * 60 * 24));

		const valorInvestido = parseFloat(item.valor);

		let rendimento = 0

		if (diasInvestidos <= 0) return 0;

		if (item.idTipoInvest > 6) {
			const taxaCotacao = cotacoes?.currencies[item.nomeReferencia]?.buy || 1;
			rendimento = valorInvestido * taxaCotacao;

		} else {
			const taxaPercentual = taxas?.find(taxa => taxa?.nome === item.nomeReferencia);
			const taxaDecimal = parseFloat(taxaPercentual?.valor) / 100;
			const rendimentoAnual = valorInvestido * Math.pow(1 + taxaDecimal, diasInvestidos / 365);
			rendimento = rendimentoAnual - valorInvestido;
		}

		return rendimento.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
	};

	return (
		<Card sx={styles.cardInputs}>
			<ListItem >
				<Paper elevation={8} component="form" sx={styles.paperInputs}>

					<CardHeader title={item.label} />

					<Divider aria-hidden="true" flexItem sx={{ bgcolor: 'black', mt: 0, mb: 2 }} />

					<TextField
						fullWidth
						id={item.id.toString()}
						type="number"
						variant="standard"
						value={item.valor || ''}
						// onChange={(e) => handleValores(e, index)}
						InputProps={{
							startAdornment: <InputAdornment position="start">Valor investido: R$</InputAdornment>,
							inputProps: {
								min: 0
							},
						}}
					/>
					<TextField
						fullWidth
						id={item.id.toString()}
						type="text"
						variant="standard"
						value={item.nomeInvest || ''}
						// onChange={(e) => handleValores(e, index)}
						InputProps={{
							startAdornment: <InputAdornment position="start">Você está investimento em: {item.simboloInvest}</InputAdornment>,
						}}
					/>

					<TextField sx={{ mt: 1 }}
						fullWidth
						id={item.id.toString()}
						type="text"
						variant="standard"
						value={getInfoTaxasECotacoes() || ''}
						// onChange={(e) => handleValores(e, index)}
						InputProps={{
							startAdornment: <InputAdornment position="start">{item.idTipoInvest <= 6 ? 'Taxa' : 'Cotação'}: </InputAdornment>,
							inputProps: {
								min: 0
							},
						}}
					/>

					<TextField sx={{ mt: 1 }}
						fullWidth
						id={item.id.toString()}
						type="text"
						variant="standard"
						value={calcularRendimento() || ''}
						// onChange={(e) => handleValores(e, index)}
						InputProps={{
							startAdornment: <InputAdornment position="start">{item.idTipoInvest <=6 ? 'Rendimento anual:' : 'Conversão:'} </InputAdornment>,
							inputProps: {
								min: 0
							},
						}}
					/>
					<TextField sx={{ mt: 1 }}
						fullWidth
						id={item.id.toString()}
						type="text"
						variant="standard"
						value={item.dataInicio || ''}
						// onChange={(e) => handleValores(e, index)}
						InputProps={{
							startAdornment: <InputAdornment position="start">Data Inicio:</InputAdornment>
						}}
					/>
					<TextField sx={{ mt: 1 }}
						fullWidth
						id={item.id.toString()}
						type="text"
						variant="standard"
						value={item.dataFim || ''}
						// onChange={(e) => handleValores(e, index)}
						InputProps={{
							startAdornment: <InputAdornment position="start">Data Fim:</InputAdornment>
						}}
					/>

					<TextField sx={{ mt: 2 }}
						fullWidth
						multiline
						label="Descrição do investimento"
						id={item.id.toString()}
						value={item.descricao || ''}
						minRows={2}
					/>

					<CardActions>
						<Tooltip arrow title='Editar investimento'>
							<IconButton color="primary" aria-label="edit" onClick={() => AbreEditorInvest(item)}>
								<EditIcon />
							</IconButton>
						</Tooltip>

						<Tooltip arrow title='Excluir investimento'>
							<IconButton color="error" aria-label="delete" onClick={() => abreModalDeleteInput(item.label, item.id)}>
								<DeleteIcon />
							</IconButton>
						</Tooltip>
					</CardActions>

				</Paper>
			</ListItem>
		</Card>
	);
};

export default Investimentos;