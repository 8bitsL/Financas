import React, { useState, useEffect } from 'react';
import { Box, Paper, TextField, Typography, InputAdornment, Fab } from '@mui/material';
import { BotaoSalvar, Titulo } from '../Complementos';

const styles = {
	boxPai: {
		width: '99%',
		height: '70%',
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
		height: '85%',
	},
	boxInputs: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		mt: 1
	},
	boxColumn: {
		display: 'flex',
		flexDirection: 'column',
		flex: 1
	},
	paperInputs: {
		mt: 1,
		p: 1.3,
		ml: 1,
		mr: 1,
		textAlign: 'center',
	}
}

const GastosVariaveis = () => {
	const [saldoTotal, setSaldoTotal] = useState('');
	const [valores, setValores] = useState({
		bradesco: '',
		itau: '',
		c6: '',
		prestacaoCelulares: '',
		outros: '',
		outros2: ''
	})

	const handleValores = (event) => {
		setValores({
			...valores,
			[event.target.id]: Math.abs(event.target.value)
		});
	};

	useEffect(() => {
		const somaValores = Number(valores.bradesco + valores.itau + valores.c6 + valores.prestacaoCelulares + valores.outros + valores.outros2);
		setSaldoTotal(somaValores);
	}, [valores])

	return (
		<Box sx={styles.boxPai}>

			<Titulo texto={'Informe aqui os seus gastos variaveis mensais'} />

			<Box sx={styles.container}>

				<Box sx={styles.boxInputs}>

					<Box sx={styles.boxColumn}>
						<Paper sx={styles.paperInputs} elevation={8} >
							<TextField fullWidth
								id='bradesco'
								label='Bradesco'
								type='number'
								value={valores.bradesco}
								onChange={(e) => handleValores(e)}
								InputProps={{
									startAdornment: <InputAdornment position="start">R$</InputAdornment>,

								}}
							/>

						</Paper>

						<Paper sx={styles.paperInputs} elevation={8} >
							<TextField fullWidth
								id='itau'
								label='Itau'
								type='number'
								value={valores.itau}
								onChange={(e) => handleValores(e)}
								InputProps={{
									startAdornment: <InputAdornment position="start">R$</InputAdornment>,

								}}
							/>
						</Paper>

						<Paper sx={styles.paperInputs} elevation={8} >
							<TextField fullWidth
								id='c6'
								label='C6'
								type='number'
								value={valores.c6}
								onChange={(e) => handleValores(e)}
								InputProps={{
									startAdornment: <InputAdornment position="start">R$</InputAdornment>,

								}}
							/>
						</Paper>
					</Box>

					<Box sx={styles.boxColumn} >
						<Paper sx={styles.paperInputs} elevation={8} >
							<TextField fullWidth
								id='prestacaoCelulares'
								label='Prestação dos Celulares'
								type='number'
								value={valores.prestacaoCelulares}
								onChange={(e) => handleValores(e)}
								InputProps={{
									startAdornment: <InputAdornment position="start">R$</InputAdornment>,

								}}
							/>

						</Paper>

						<Paper sx={styles.paperInputs} elevation={8} >
							<TextField fullWidth
								id='outros'
								label='Outros'
								type='number'
								value={valores.outros}
								onChange={(e) => handleValores(e)}
								InputProps={{
									startAdornment: <InputAdornment position="start">R$</InputAdornment>,

								}}
							/>
						</Paper>

						<Paper sx={styles.paperInputs} elevation={8} >
							<TextField fullWidth
								id='outros2'
								label='Outros2'
								type='number'
								value={valores.outros2}
								onChange={(e) => handleValores(e)}
								InputProps={{
									startAdornment: <InputAdornment position="start">R$</InputAdornment>,

								}}
							/>
						</Paper>
					</Box>

				</Box>

				<Box sx={{ alignSelf: 'self-end', p: 1, mr: 1 }}>
					<Fab variant="extended" sx={{ bgcolor: 'white' }}>
						<Typography variant='subtitle2' fontFamily='roboto' fontSize='16px'>TOTAL DE GASTOS: {saldoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Typography>
					</Fab>

				</Box>

				<BotaoSalvar texto={'Salvar seus gastos variaveis'} />

			</Box>
		</Box>
	)
}

export default GastosVariaveis;