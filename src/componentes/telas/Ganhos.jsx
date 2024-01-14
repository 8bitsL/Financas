import React, { useState, useEffect } from 'react';
import { Box, Paper, TextField, InputAdornment, IconButton, List, ListItem } from '@mui/material';
import { EditInput, BotaoAdicionarNovoInput, BotaoSalvar, Titulo, ValorTotal, AddInput, ModalConfirmaDelete } from '../Complementos';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


import { pegaInputsGanhos, deletaGanhos, addGanhos } from '../../api/ganhosApi';

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

const Ganhos = () => {
	const [valores, setValores] = useState();
	const [saldoTotal, setSaldoTotal] = useState('');
	const [forceUpdate, setForceUpdate] = useState(false);
	const [dadosParaEditarLabel, setDadosParaEditarLabel] = useState({ open: false, tipo: '', labelAtual: '', indexAtual: '', novoLabel: '' })
	const [dadosParaAddInput, setDadosParaAddInput] = useState({ open: false, label: '', valor: '', id: '' })
	const [dadosParaDeletarInput, setDadosParaDeletarInput] = useState({ open: false, label: '', id: '' })

	const handleValores = (event, index) => {

		const newValue = event.target.value.replace(/[^0-9.]/g, '');

		setValores(prevValores => prevValores.map((item, i) => (i === index ? { ...item, valor: newValue } : item)));
	};

	const salvaDados = async () => {

		await addGanhos(valores);

		setForceUpdate(prevState => !prevState);
	}

	/* AQUI COMEÇA A CRIÇÃO DE UM NOVO INPUT */

	const abreAddNovoInput = () => setDadosParaAddInput({ open: true })

	const addValoresNovoInput = (value, tipo) => {

		if (tipo === 'label') {

			setDadosParaAddInput((prevState) => ({
				...prevState,
				label: value

			}));

		} else {

			setDadosParaAddInput((prevState) => ({
				...prevState,
				valor: value

			}));
		}
	}

	const salvaNovoInput = () => {

		const UltimoElemento = valores[valores.length - 1]

		const novoId = Number(UltimoElemento?.id + 1 || 0)

		const novosValores = [...valores, { id: novoId, label: dadosParaAddInput.label, valor: dadosParaAddInput.valor }];

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

		await deletaGanhos(id)

		fechaModalDeleteInput();

		salvaDados();
	}

	/*AQUI TERMINA A PARTE QUE DELETA O INPUT*/

	useEffect(() => {

		const fetchData = async () => {

			const response = await pegaInputsGanhos();

			const dados = response.data;

			const retiraMes = dados.map(({ id, label, valor, valido }) => ({ id, label, valor, valido }));

			setValores(retiraMes);
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
				<Titulo texto={'Informe aqui os seus ganhos mensais'} />
				<Box sx={styles.container}>

					{valores &&
						<List sx={styles.boxInputs}>
							{valores.map((item, index) => (
								<GanhoItem
									key={index}
									item={item}
									index={index}
									handleValores={handleValores}
									AbreEditorLabel={AbreEditorLabel}
									abreModalDeleteInput={abreModalDeleteInput}
								/>
							))}
						</List>
					}

					<Box sx={{ alignSelf: 'self-end', p: 1, mr: 1 }}>

						<BotaoAdicionarNovoInput title={"Adicionar novos Ganhos"} click={abreAddNovoInput} />
						<ValorTotal saldoTotal={saldoTotal} title="Saldo Total" />

					</Box>

					<BotaoSalvar texto={'Salvar seus ganhos mensais'} salvaDados={salvaDados} />
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
				title={'Adicione um novo input'}
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

const GanhoItem = ({ item, index, handleValores, AbreEditorLabel, abreModalDeleteInput }) => {
	if (item.valido !== 'false') {
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
				</Paper>
			</ListItem>
		);
	} else {
		return null;
	}
};


export default Ganhos;