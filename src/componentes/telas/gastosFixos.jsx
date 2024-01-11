import React, { useState, useEffect } from 'react';
import { Box, Paper, TextField, Typography, InputAdornment, Fab } from '@mui/material';
import { BotaoSalvar, Titulo } from '../Complementos';

// import { styled } from '@mui/material/styles';

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

// const CssTextField = styled(TextField)({
// 	'& .MuiTypography-root':{
// 		color:'white'
// 	},
// 	'& .MuiInputLabel-root':{
// 		color:'#d1a94e'
// 	},

// 	'& .MuiInput-underline:after': {
// 	  borderBottomColor: '#d1a94e',
// 	},
// 	'& .MuiOutlinedInput-root': {

// 	  '&:hover fieldset': {
// 		borderColor: '#d1a94e',
// 	  },
// 	  '&.Mui-focused fieldset': {
// 		borderColor: '#d1a94e'	
// 	  },
// 	},
//   });

const GastosFixos = () => {
	const [saldoTotal, setSaldoTotal] = useState('');
	const [valores, setValores] = useState({
		internet: '',
		celular: '',
		seguro: '',
		carro: '',
		fies: '',
		outros: ''
	})

	const handleValores = (event) => {
		setValores({
			...valores,
			[event.target.id]: Math.abs(event.target.value)
		});
	};

	useEffect(() => {
		const somaValores = Number(valores.internet + valores.celular + valores.seguro + valores.carro + valores.fies + valores.outros);
		setSaldoTotal(somaValores);
	}, [valores])

	return (
		<Box sx={styles.boxPai}>

			<Titulo texto={'Informe aqui os seus gastos fixos mensais'} />

			<Box sx={styles.container}>

				<Box sx={styles.boxInputs}>

					<Box sx={styles.boxColumn}>
						<Paper sx={styles.paperInputs} elevation={8} >
							<TextField fullWidth
								id='internet'
								label='Internet'
								type='number'
								value={valores.internet}
								onChange={(e) => handleValores(e)}
								InputProps={{
									startAdornment: <InputAdornment position="start">R$</InputAdornment>,

								}}
							/>

						</Paper>

						<Paper sx={styles.paperInputs} elevation={8} >
							<TextField fullWidth
								id='celular'
								label='Celular'
								type='number'
								value={valores.celular}
								onChange={(e) => handleValores(e)}
								InputProps={{
									startAdornment: <InputAdornment position="start">R$</InputAdornment>,

								}}
							/>
						</Paper>

						<Paper sx={styles.paperInputs} elevation={8} >
							<TextField fullWidth
								id='seguro'
								label='Seguro do Carro'
								type='number'
								value={valores.seguro}
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
								id='carro'
								label='Prestação do Carro'
								type='number'
								value={valores.carro}
								onChange={(e) => handleValores(e)}
								InputProps={{
									startAdornment: <InputAdornment position="start">R$</InputAdornment>,

								}}
							/>

						</Paper>

						<Paper sx={styles.paperInputs} elevation={8} >
							<TextField fullWidth
								id='fies'
								label='Fies'
								type='number'
								value={valores.fies}
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
					</Box>

				</Box>

				<Box sx={{ alignSelf: 'self-end', p: 1, mr: 1 }}>
					<Fab variant="extended" sx={{ bgcolor: 'white' }}>
						<Typography variant='subtitle2' fontFamily='roboto' fontSize='16px'>TOTAL DE GASTOS: {saldoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Typography>
					</Fab>

				</Box>

				<BotaoSalvar texto={'Salvar seus gastos fixos'} />

			</Box>
		</Box>
	)
}

export default GastosFixos;