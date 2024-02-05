import React, { useState, useEffect } from 'react';
import { Box, Paper, TextField, InputAdornment, IconButton, List, ListItem, Tooltip } from '@mui/material';
import { EditInput, BotaoAdicionarNovoInput, BotaoSalvar, Titulo, ValorTotal, AddInput, ModalConfirmaDelete } from '../Complementos';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { getGastosVariaveis, deletaGastosVariaveis, addGastosVariaveis } from '../../api/gastosVariaveisApi'

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

const GastosVariaveis = () => {
	const [valores, setValores] = useState();
	const [saldoTotal, setSaldoTotal] = useState('');
	const [forceUpdate, setForceUpdate] = useState(false);
	const [dadosParaEditarLabel, setDadosParaEditarLabel] = useState({ open: false, tipo: '', labelAtual: '', indexAtual: '', novoLabel: '' })
	const [dadosParaAddInput, setDadosParaAddInput] = useState({ open: false})
	const [dadosParaDeletarInput, setDadosParaDeletarInput] = useState({ open: false, label: '', id: '' })

	const handleValores = (event, index) => {

		const newValue = event.target.value.replace(/[^0-9.]/g, '');

		setValores(prevValores => prevValores.map((item, i) => (i === index ? { ...item, valor: newValue } : item)));
	};

	const salvaDados = async () => {

		await addGastosVariaveis(valores);

		setForceUpdate(prevState => !prevState);
	}

	/* AQUI COMEÇA A CRIÇÃO DE UM NOVO INPUT */

	const abreAddNovoInput = () => setDadosParaAddInput({ open: true })

	const addValoresNovoInput = (value, campo) => {
		setDadosParaAddInput((prevState) => ({
			...prevState,
			[campo]: value, 
			pago: "false"
		}));
	}

	const salvaNovoInput = () => {

		const maiorID = Math.max(...valores.map(item => item.id), 0);

		const novoId = Number(maiorID + 1 || 0)

		const novosValores = [...valores, { id: novoId, ...dadosParaAddInput }];

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

		await deletaGastosVariaveis(id)

		fechaModalDeleteInput();
	}

	/*AQUI TERMINA A PARTE QUE DELETA O INPUT*/

	const confirmaPagamento = (idItem) => setValores((prevValores) => prevValores.map((item) => item.id === idItem ? { ...item, pago: !JSON.parse(item.pago) } : item));


	useEffect(() => {
		const fetchData = async () => {

			const response = await getGastosVariaveis();

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
				<Titulo texto={'Informe aqui os seus gastos variaveis'} />
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
									confirmaPagamento={confirmaPagamento}

								/>
							))}
						</List>
					}

					<Box sx={{ alignSelf: 'self-end', p: 1, mr: 1 }}>

						<BotaoAdicionarNovoInput title={"Adicionar novos gastos"} click={abreAddNovoInput} />
						<ValorTotal saldoTotal={saldoTotal} title="Gastos Variaveis" />

					</Box>

					<BotaoSalvar texto={'Salvar seus gastos variaveis'} salvaDados={salvaDados} />
				</Box>
			</Box>

			<EditInput
				title={'Edite o nome'}
				dadosParaEditarLabel={dadosParaEditarLabel}
				fechaEditorLabel={fechaEditorLabel}
				EditaLabel={EditaLabel}
				NovoLabel={NovoLabel}
			/>

			<AddInput
				title={'gasto variavel'}
				dadosParaAddInput={dadosParaAddInput}
				addValoresNovoInput={addValoresNovoInput}
				salvaNovoInput={salvaNovoInput}
				fechaAddNovoInput={fechaAddNovoInput}
			/>

			<ModalConfirmaDelete
				dadosParaDeletarInput={dadosParaDeletarInput}
				fechaModalDeleteInput={fechaModalDeleteInput}
				deletaInput={deletaInput}
			/>

		</>
	);
}

const GastosItem = ({ item, index, handleValores, AbreEditorLabel, abreModalDeleteInput, confirmaPagamento }) => {
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
					<Tooltip title="Marcar como pago" arrow>
						<IconButton color={item.pago === "true" || item.pago === true ? 'success' : ''} aria-label="pago" onClick={() => confirmaPagamento(item.id)}>
							<CheckCircleIcon />
						</IconButton>
					</Tooltip>
				</Paper>
			</ListItem>
		);
};


export default GastosVariaveis;