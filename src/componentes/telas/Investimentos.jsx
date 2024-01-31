import React, { useState, useEffect } from 'react';
import { Box, Paper, TextField, InputAdornment, IconButton, List, ListItem, Tooltip } from '@mui/material';
import { EditInput, BotaoAdicionarNovoInput, BotaoSalvar, Titulo, ValorTotal, AddInput, ModalConfirmaDelete, AddInfoInvestimentos } from '../Complementos';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';

import { getInvestimentos, deletaInvestimentos, addInvestimentos } from '../../api/investimentosApi'

const styles = {
	boxPai: {
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
		justifyContent: 'space-around',
		height: '90%',
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
		width: 400
	}
}

const Investimentos = () => {
	const [valores, setValores] = useState();
	const [saldoTotal, setSaldoTotal] = useState('');
	const [forceUpdate, setForceUpdate] = useState(false);
	const [dadosParaEditarLabel, setDadosParaEditarLabel] = useState({ open: false, tipo: '', labelAtual: '', indexAtual: '', novoLabel: '' })
	const [dadosParaAddInput, setDadosParaAddInput] = useState({ open: false, label: '', valor: '', id: '' })
	const [dadosParaDeletarInput, setDadosParaDeletarInput] = useState({ open: false, label: '', id: '' })
	const [infoInvest, setInfoInveste] = useState({ open: false, id: '', label: '' })

	const handleValores = (event, index) => {

		const newValue = event.target.value.replace(/[^0-9.]/g, '');

		setValores(prevValores => prevValores.map((item, i) => (i === index ? { ...item, valor: newValue } : item)));
	};

	const salvaDados = async () => {

		await addInvestimentos(valores);
		console.log(valores)
		setForceUpdate(prevState => !prevState);
	}

	/* AQUI COMEÇA A CRIÇÃO DE UM NOVO INPUT */

	const abreAddNovoInput = () => setDadosParaAddInput({ open: true })

	const addValoresNovoInput = (value, tipo) => {
		console.log(value)
		if (tipo === 'label') {
			setDadosParaAddInput((prevState) => ({
				...prevState,
				label: value
			}));

		} if (tipo === 'invest') {
			setDadosParaAddInput((prevState) => ({
				...prevState,
				descricao: value
			}));
		}

		else{
			setDadosParaAddInput((prevState) => ({
				...prevState,
				valor: value
			}));
		}

	}

	const salvaNovoInput = () => {

		const UltimoElemento = valores[valores.length - 1]

		const novoId = Number(UltimoElemento?.id + 1 || 0)

		const novosValores = [...valores, { id: novoId, label: dadosParaAddInput.label, valor: dadosParaAddInput.valor, descricao: dadosParaAddInput.descricao }];

		setValores(novosValores);

		fechaAddNovoInput();

	}
	const fechaAddNovoInput = () => setDadosParaAddInput({ open: false })

	/* AQUI TERMINA A CRIÇÃO DE UM NOVO INPUT */

	/* AQUI COMEÇA A PARTE RESPONSÁVEL POR EDITAR O LABEL */

	const AbreEditorLabel = (label, index, tipo) => setDadosParaEditarLabel({ open: true, tipo: tipo, labelAtual: label, indexAtual: index })

	const NovoLabel = (value) => {
		setDadosParaEditarLabel((prevState) => ({
			...prevState,
			novoLabel: value
		}));
	}

	const EditaLabel = () => {
		const updatedValores = [...valores];
		updatedValores[dadosParaEditarLabel.indexAtual].label = dadosParaEditarLabel.novoLabel;
		setValores(updatedValores);
		fechaEditorLabel();
	}

	const fechaEditorLabel = () => setDadosParaEditarLabel({ open: false })

	/* AQUI TERMINA A PARTE RESPONSÁVEL POR EDITAR O LABEL */

	/*AQUI COMEÇA A PARTE QUE DELETA O INPUT*/

	const abreModalDeleteInput = (label, id) => setDadosParaDeletarInput({ open: true, label: label, id: id });

	const fechaModalDeleteInput = () => setDadosParaDeletarInput({ open: false });

	const deletaInput = async (id) => {
		const deletaInput = valores.filter(item => item.id !== id);

		setValores(deletaInput)

		await deletaInvestimentos(id)

		fechaModalDeleteInput();

		salvaDados();
	}

	/*AQUI TERMINA A PARTE QUE DELETA O INPUT*/


	/*AQUI COMEÇA A PARTE QUE EDITA AS INFORMAÇÕES DO INVESTIMENTOI*/

	const abreInfoInvest = (investimento) => setInfoInveste({ ...investimento, open: true });

	const alteraDadosInfoInvest = (value) => setInfoInveste((prevState) => ({ ...prevState, descricao: value }))

	const salvaDadosInfoInvest = () => {
		const novoValor = valores.map((item) => item.id === infoInvest.id ? { ...item, descricao: infoInvest.descricao } : item)

		setValores(novoValor)

		fechaInfoInvest();
	}

	const fechaInfoInvest = () => setInfoInveste({ open: false })
	/*AQUI TERMINA A PARTE QUE EDITA AS INFORMAÇÕES DO INVESTIMENTOI*/

	useEffect(() => {
		const fetchData = async () => {

			const response = await getInvestimentos();

			const dados = response.data;

			setValores(dados);
		};

		fetchData();
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
								<GastosItem
									key={index}
									item={item}
									index={index}
									handleValores={handleValores}
									AbreEditorLabel={AbreEditorLabel}
									abreModalDeleteInput={abreModalDeleteInput}
									abreInfoInvest={abreInfoInvest}

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

			<EditInput
				title={'Edite o Label'}
				dadosParaEditarLabel={dadosParaEditarLabel}
				fechaEditorLabel={fechaEditorLabel}
				EditaLabel={EditaLabel}
				NovoLabel={NovoLabel}
			/>

			<AddInput
				title={'Adicione um novo investimento'}
				dadosParaAddInput={dadosParaAddInput}
				addValoresNovoInput={addValoresNovoInput}
				salvaNovoInput={salvaNovoInput}
				fechaAddNovoInput={fechaAddNovoInput}
				tipo={'invest'}
			/>

			<ModalConfirmaDelete
				dadosParaDeletarInput={dadosParaDeletarInput}
				fechaModalDeleteInput={fechaModalDeleteInput}
				deletaInput={deletaInput}
			/>

			<AddInfoInvestimentos
				infoInvest={infoInvest}
				alteraDadosInfoInvest={alteraDadosInfoInvest}
				salvaDadosInfoInvest={salvaDadosInfoInvest}
				close={fechaInfoInvest}

			/>

		</>
	);
}

const GastosItem = ({ item, index, handleValores, AbreEditorLabel, abreModalDeleteInput, abreInfoInvest }) => {
		return (
			<ListItem sx={styles.paperInputs}>
				<Paper elevation={8} component="form" sx={styles.paperInputs}>
					<TextField
						fullWidth
						id={item.id.toString()}
						label={item.label}
						type="number"
						value={item.valor}
						onChange={(e) => handleValores(e, index)}
						InputProps={{
							startAdornment: <InputAdornment position="start">R$</InputAdornment>,
							inputProps: {
								min: 0
							},
						}}
					/>
					<IconButton color="primary" aria-label="edit" onClick={() => AbreEditorLabel(item.label, index, 'edit')}>
						<EditIcon />
					</IconButton>

					<IconButton color="error" aria-label="delete" onClick={() => abreModalDeleteInput(item.label, item.id)}>
						<DeleteIcon />
					</IconButton>
					<Tooltip title={item.descricao} arrow>
						<IconButton color='info' aria-label="pago" onClick={() => abreInfoInvest(item)}>
							<InfoIcon />
						</IconButton>
					</Tooltip>
				</Paper>
			</ListItem>
		);
};


export default Investimentos;