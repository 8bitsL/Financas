import React from 'react';
import { Paper, Typography, Button, Tooltip, Fab, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, FormControl, InputLabel } from '@mui/material';
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
					onChange={(e) => props.addValoresNovoInput(e.target.value)}
				/>
				{props.tipo === 'invest' &&
					<>
						<TextField
							margin="dense"
							id="infos"
							label='Informações do investimento'
							type="text"
							fullWidth
							variant="standard"
							onChange={(e) => props.addValoresNovoInput(e.target.value, 'invest')}
						/>

						<FormControl fullWidth sx={{mt: 2}}>
							<InputLabel htmlFor="dtinicio" style={{transform: 'translate(0, .5px) scale(0.75)',marginTop: 5,  marginLeft: 3}}>
								Data inicial do investimento
							</InputLabel>
							<TextField
								id="dtinicio"
								type="date"
								fullWidth
								onChange={(e) => props.addValoresNovoInput(e.target.value, 'invest')}
								InputLabelProps={{
									shrink: true,
								  }}
								  InputProps={{ style: { paddingTop: 12  } }}
							/>
						</FormControl>

						<FormControl fullWidth sx={{mt: 2}}>
							<InputLabel htmlFor="dtfim" style={{transform: 'translate(0, .5px) scale(0.75)', marginTop: 5, marginLeft: 3}}>
								Data final do investimento
							</InputLabel>
							<TextField
								id="dtfim"
								type="date"
								fullWidth
								onChange={(e) => props.addValoresNovoInput(e.target.value, 'invest')}
								InputLabelProps={{
									shrink: true,
								  }}
								  InputProps={{ style: { paddingTop: 10} }}
							/>
						</FormControl>
					</>
				}
			</DialogContent>
			<DialogActions>
				<Button onClick={props.salvaNovoInput}>Criar</Button>
				<Button onClick={props.fechaAddNovoInput} color="error">Cancelar</Button>
			</DialogActions>
		</Dialog>
	)
}

export const AddInfoInvestimentos = (props) => {
	return (
		<Dialog open={props.infoInvest.open} onClose={props.close}>
			<DialogTitle>Informações do investimento</DialogTitle>
			<DialogContent sx={{ width: 500 }}>
				<DialogContentText>
					Insira aqui as informações sobre o investimento <strong>{props.infoInvest.label}</strong>
				</DialogContentText>
				<TextField
					autoFocus
					margin='dense'
					id="infoInvest"
					label="Informações"
					type='text'
					fullWidth
					variant='standard'
					value={props.infoInvest.descricao || ''}
					onChange={(e) => props.alteraDadosInfoInvest(e.target.value)}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.salvaDadosInfoInvest}>Adicionar</Button>
				<Button onClick={props.close} color="error">Cancelar</Button>
			</DialogActions>
		</Dialog>
	)
}

