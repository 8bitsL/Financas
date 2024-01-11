import { Box, Card, Stack, Typography } from '@mui/material';
import React from 'react';

const styles = {
	stack:{
		ml: 1,
		mr: 1,
		mb: 1,
		width: '99%', 
		height: '50%'
		
	},
	box:{
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',

		width: '33%',
		height: '100%',
		bgcolor: '#252724',
		borderRadius: '10px'

	},
	card: {
		width: '93%', 
		height: '93%',
		bgcolor: '#7f7f7f'
	}
}

const MostradoresIniciais = () => {

	return(
		<Stack direction='row' spacing={1} sx={styles.stack}>
			<Box sx={styles.box}>
				<Card elevation={5} sx={styles.card}>
					<Typography></Typography>
				</Card>
			</Box>
			<Box sx={styles.box}>
				<Card elevation={5} sx={styles.card}>
					<Typography></Typography>
				</Card>
			</Box>
			<Box  sx={styles.box}>
				<Card elevation={5} sx={styles.card}>
					<Typography></Typography>
				</Card>
			</Box>
		</Stack>
	)
}

export default MostradoresIniciais;