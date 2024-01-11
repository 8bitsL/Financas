import { Box, Card, Typography } from '@mui/material';
import React from 'react';

const styles = {
	boxPai: {
		mt: 2,
		'& *': {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		}
	},
	boxFilho: {
		width: '500px',
		height: '90px',
		bgcolor: '#2f2f2e',
		borderRadius: '10px'
	},
	card: {
		width: '270px',
		height: '50px',
		borderRadius: '10px',
		bgcolor: '#2f2f2e'
	}
}
function MostraMes() {
	const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
	const data = new Date();
	const anoAtual = data.getFullYear();
	const mesAtual = meses[data.getMonth()];

	return (
		<Box sx={styles.boxPai}>
			<Box sx={styles.boxFilho}>
				<Card elevation={8} sx={styles.card} >
					<Typography variant='body1' color="white" fontFamily='roboto' fontWeight='600' fontSize="26px">
						{mesAtual}/{anoAtual}
					</Typography>
				</Card>
			</Box>
		</Box>
	)
}

export default MostraMes