import React from 'react';
import { Paper, Typography, Button, Tooltip, Fab, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, FormControl, InputLabel, MenuItem } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';

const style = {
	paperTitle: {
		display: 'flex',
		justifyContent: 'center',
		p: 2,
		m: 1,
		bgcolor: '#2f2f2e'
	}

}


export const Titulo = (props) => {
	return (
		<Paper sx={style.paperTitle} elevation={8}>
			<Typography variant='body1' color="white" fontFamily='roboto' fontSize='20px'>
				{props.texto}
			</Typography>
		</Paper>
	)
}


export const BotaoSalvar = (props) => {
	return (
		<Paper sx={style.paperTitle} elevation={8}>
			<Button endIcon={<SendIcon />} sx={{ color: 'white', width: '100%', height: '100%' }} onClick={props.salvaDados}>{props.texto}</Button>
		</Paper>

	)
}

export const BotaoAdicionarNovoInput = (props) => {
	return (
		<Tooltip title={props.title} arrow sx={{ mr: 3 }} >
			<Fab color="primary" aria-label="add" size="small" onClick={() => props.click('add')}>
				<AddIcon />
			</Fab>
		</Tooltip>
	)

}

export const ValorTotal = (props) => {
	return (
		<Fab variant="extended" sx={{ bgcolor: 'white' }} >
			<Typography variant='subtitle2' fontFamily='roboto' fontSize='16px'>{props.title}: {props.saldoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Typography>
		</Fab>
	)
}

export const ModalConfirmaDelete = (props) => {
	return (
		<Dialog open={props.dadosParaDeletarInput.open} onClose={props.fechaModalDeleteInput}>
			<DialogTitle>Tem certeza que deseja excluir <strong>"{props.dadosParaDeletarInput.label}" </strong>?</DialogTitle>
			<DialogContent>
				<DialogContentText>Ao exluir este item, ele sera apagado de forma permanente</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => props.deletaInput(props.dadosParaDeletarInput.id)} color="error">Excluir</Button>
				<Button onClick={props.fechaModalDeleteInput}>Cancelar</Button>
			</DialogActions>
		</Dialog>
	)
}

export const EditInput = (props) => {
	return (
		<Dialog open={props.dadosParaEditarLabel.open} onClose={props.fechaEditorLabel}>
			<DialogTitle>{props.title}</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Atualmente o nome é: <strong>{props.dadosParaEditarLabel.labelAtual}</strong>
				</DialogContentText>
				<TextField
					autoFocus
					margin="dense"
					id="name"
					label='Novo nome'
					type="text"
					fullWidth
					variant="standard"
					onChange={(e) => props.NovoLabel(e.target.value)}

				/>
				{/* {props.tipo === 'invest' &&
					EditInvestimento(props)
				} */}
			</DialogContent>
			<DialogActions>
				<Button onClick={props.EditaLabel}>Alterar</Button>
				<Button onClick={props.fechaEditorLabel} color="error">Cancelar</Button>
			</DialogActions>
		</Dialog>
	)
}

export const AddInput = (props) => {
	return (
		<Dialog open={props.dadosParaAddInput.open} onClose={props.fechaAddNovoInput}>
			<DialogTitle>Novos itens</DialogTitle>
			<DialogContent sx={{ width: 250 }}>
				<DialogContentText>Adicione um novo <strong>{props.title}</strong></DialogContentText>
				<TextField
					autoFocus
					margin="dense"
					id="name"
					label='Nome'
					type="text"
					fullWidth
					variant="standard"
					onChange={(e) => props.addValoresNovoInput(e.target.value, 'label')}

				/>
				<TextField
					margin="dense"
					id="valor"
					label='Valor'
					type="number"
					fullWidth
					variant="standard"
					onChange={(e) => props.addValoresNovoInput(e.target.value, 'valor')}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.salvaNovoInput}>Criar</Button>
				<Button onClick={props.fechaAddNovoInput} color="error">Cancelar</Button>
			</DialogActions>
		</Dialog>
	)
}

//PARTE RELACIONADA AOS INVESTIMENTOS

export const AddInvestimento = (props) => {
	const formataData = (data) => {
		console.log(data)
		const [ano, mes, dia] = data.split('-');
		return `${dia}/${mes}/${ano}`;
	}

	return (
		<Dialog open={props.dadosParaAddInvestimento.open} onClose={props.fechaAddNovoInput}>
			<DialogTitle>Novo investimento</DialogTitle>
			<DialogContent sx={{ width: 250 }}>
				<DialogContentText>Adicione um novo <strong>{props.title}</strong></DialogContentText>
				<TextField
					autoFocus
					margin="dense"
					id="name"
					label='Nome do investimento'
					type="text"
					fullWidth
					variant="standard"
					onChange={(e) => props.addValoresNovoInput(e.target.value, 'label')}

				/>
				<TextField
					margin="dense"
					id="valor"
					label='Valor do investimento'
					type="number"
					fullWidth
					variant="standard"
					onChange={(e) => props.addValoresNovoInput(e.target.value, 'valor')}
				/>
				<TextField sx={{ mt: 3 }}
					id="tipoInvest"
					select
					label="Tipo de investimento"
					fullWidth
					variant="standard"
					onChange={(e) => props.addValoresNovoInput(e.target.value, 'idTipoInvest')}
				>
					{props.tiposInvest?.map((tipo) => (
						<MenuItem key={tipo.id} value={tipo.id}>
							{tipo.nomeInvest}  {tipo?.simboloInvest}
						</MenuItem>
					))}

				</TextField>
				
				<TextField
					margin="dense"
					id="infos"
					label='Informações do investimento'
					type="text"
					fullWidth
					multiline
					minRows={2}
					onChange={(e) => props.addValoresNovoInput(e.target.value, 'descricao')}
				/>

				<FormControl fullWidth sx={{ mt: 2 }}>
					<InputLabel htmlFor="dtinicio" style={{ transform: 'translate(0, .5px) scale(0.75)', marginTop: 5, marginLeft: 3 }}>
						Data inicial do investimento
					</InputLabel>
					<TextField
						id="dtinicio"
						type="date"
						fullWidth
						onChange={(e) => {
							const formatarData = formataData(e.target.value)
							props.addValoresNovoInput(formatarData, 'dataInicio')
						}}
						InputProps={{ style: { paddingTop: 12 } }}
					/>
				</FormControl>

				<FormControl fullWidth sx={{ mt: 2 }}>
					<InputLabel htmlFor="dtfim" style={{ transform: 'translate(0, .5px) scale(0.75)', marginTop: 5, marginLeft: 3 }}>
						Data final do investimento
					</InputLabel>
					<TextField
						id="dtfim"
						type="date"
						fullWidth
						onChange={(e) => {
							const formatarData = formataData(e.target.value)
							props.addValoresNovoInput(formatarData, 'dataFim')
						}}
						InputProps={{ style: { paddingTop: 10 } }}
					/>
				</FormControl>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.salvaNovoInput}>Criar</Button>
				<Button onClick={props.fechaAddNovoInput} color="error">Cancelar</Button>
			</DialogActions>
		</Dialog>



	)
}

export const EditInputInvest = (props) => {

	const formataDataParaExibir = (data) => {
		if (!data) return ''

		const [dia, mes, ano] = data.split('/');

		return `${ano}-${mes}-${dia}`;
	}

	const formataDataParaEnviar = (data) => {
		if (!data) return ''

		const [ano, mes, dia] = data.split('-');

		return `${dia}/${mes}/${ano}`;
	}


	return (
		<Dialog open={props.dadosParaEditarInvestimento.open} onClose={props.fechaEditorInvest}>
			<DialogTitle>{props.title}</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Atualmente o nome é: <strong>{props.dadosParaEditarInvestimento.label}</strong>
				</DialogContentText>
				<TextField
					autoFocus
					margin="dense"
					id="name"
					label='Novo nome'
					type="text"
					fullWidth
					variant="standard"
					onChange={(e) => props.NovoInvest(e.target.value, 'label')}

				/>
				<TextField
					margin="dense"
					id="name"
					label='Valor investido'
					type="number"
					fullWidth
					variant="standard"
					value={props.dadosParaEditarInvestimento.valor || ''}
					onChange={(e) => props.NovoInvest(e.target.value, 'valor')}

				/>
				<TextField
					margin="dense"
					id="infos"
					label='Informações do investimento'
					type="text"
					fullWidth
					multiline
					minRows={2}
					value={props.dadosParaEditarInvestimento.descricao || ''}
					onChange={(e) => props.NovoInvest(e.target.value, 'descricao')}
				/>

				<FormControl fullWidth sx={{ mt: 2 }}>
					<InputLabel htmlFor="dtinicio" style={{ transform: 'translate(0, .5px) scale(0.75)', marginTop: 5, marginLeft: 3 }}>
						Data inicial do investimento
					</InputLabel>
					<TextField
						id="dtinicio"
						type="date"
						fullWidth
						value={formataDataParaExibir(props.dadosParaEditarInvestimento.dataInicio)}
						onChange={(e) => {
							const formatarData = formataDataParaEnviar(e.target.value)
							props.NovoInvest(formatarData, 'dataInicio')
						}}
						InputProps={{ style: { paddingTop: 12 } }}
					/>
				</FormControl>

				<FormControl fullWidth sx={{ mt: 2 }}>
					<InputLabel htmlFor="dtfim" style={{ transform: 'translate(0, .5px) scale(0.75)', marginTop: 5, marginLeft: 3 }}>
						Data final do investimento
					</InputLabel>
					<TextField
						id="dtfim"
						type="date"
						fullWidth
						value={formataDataParaExibir(props.dadosParaEditarInvestimento.dataFim)}
						onChange={(e) => {
							const formatarData = formataDataParaEnviar(e.target.value)
							props.NovoInvest(formatarData, 'dataFim')
						}}
						InputProps={{ style: { paddingTop: 12 } }}
					/>
				</FormControl>
				
			</DialogContent>
			<DialogActions>
				<Button onClick={props.EditaInvest}>Alterar</Button>
				<Button onClick={props.fechaEditorInvest} color="error">Cancelar</Button>
			</DialogActions>
		</Dialog>
	)
}


