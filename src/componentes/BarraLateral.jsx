import React from 'react';
import { Divider, List, ListItem, ListItemText, ListItemButton, ListItemIcon } from "@mui/material";
import {  useDispatch } from 'react-redux';
import { mostraGastosFixos, mostraMostradorPrincial, mostraGanhos, mostraGastosVariaveis } from '../redux/estados';

import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import CachedIcon from '@mui/icons-material/Cached';
import PlagiarismIcon from '@mui/icons-material/Plagiarism';

const styles = {
	list: {
		width: 240,
		height: '100%',
		backgroundColor: '#252724',
		color: 'white',

		fontFamily: 'roboto',
		'& *': {
			fontFamily: 'inherit'
		}
	},
	bemVindo: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		p: 4,
		cursor: 'pointer',
		transition: '0.5s',	
		'&:hover':{
			bgcolor: '#4b4b4b'
		},
		'&:active':{
			bgcolor: '#767676'
		},
	},

	divider: {
		borderColor: "rgb(255 255 255 /30%)"
	},
	listaBotao: {
		pt: 2,
		pb: 2,
		transition: 'background-color 0.3s ease-in-out',
		'&:hover': {
			backgroundColor: '#2F2F2E',
		}
	},
};

const BarraLateral = () => {	
	const dispatch = useDispatch();

	return (
		
		<List component="nav" sx={styles.list}>

			<ListItem key="bemVindo" sx={styles.bemVindo} onClick={() => dispatch(mostraMostradorPrincial())}>
				<ListItemText primary="Olá, Leonardo" primaryTypographyProps={{ variant: "body1",fontSize: '25px' }} />
			</ListItem>

			<Divider component="li" sx={styles.divider} />

			<ListItem key="ganhos" disablePadding>
				<ListItemButton sx={styles.listaBotao} onClick={() => dispatch(mostraGanhos())}>
					<ListItemIcon >
						<MonetizationOnIcon color="success" fontSize='medium' sx={{ ml: 3 }} />
					</ListItemIcon>
					<ListItemText primary="Ganhos" primaryTypographyProps={{ variant: "subtitle1", ml: 1 }} />
				</ListItemButton>
			</ListItem>

			<Divider component="li" sx={styles.divider} />

			<ListItem key="gastosFixos" disablePadding>
				<ListItemButton sx={styles.listaBotao} onClick={() => dispatch(mostraGastosFixos())}>
					<ListItemIcon >
						<ArrowCircleDownIcon color="error" fontSize='medium' sx={{ ml: 3 }} />
					</ListItemIcon>
					<ListItemText primary="Gastos Fixos" primaryTypographyProps={{ variant: "subtitle1", ml: 1 }} />
				</ListItemButton>
			</ListItem>

			<Divider component="li" sx={styles.divider} />

			<ListItem key="gastosVariaveis" disablePadding>
				<ListItemButton sx={styles.listaBotao} onClick={() => dispatch(mostraGastosVariaveis())}>
					<ListItemIcon >
						<CachedIcon color="warning" fontSize='medium' sx={{ ml: 3 }} />
					</ListItemIcon>
					<ListItemText primary="Gastos Variaveis" primaryTypographyProps={{ variant: "subtitle1", ml: 1 }} />
				</ListItemButton>
			</ListItem>

			<Divider component="li" sx={styles.divider} />

			<ListItem key="investimentos" disablePadding>
				<ListItemButton sx={styles.listaBotao}>
					<ListItemIcon >
						<CurrencyExchangeIcon fontSize='medium' sx={{ ml: 3,  color: 'yellow' }} />
					</ListItemIcon>
					<ListItemText primary="Investimentos" primaryTypographyProps={{ variant: "subtitle1", ml: 1 }} />
				</ListItemButton>
			</ListItem>

			<Divider component="li" sx={styles.divider} />

			<ListItem key="historico" disablePadding>
				<ListItemButton sx={styles.listaBotao}>
					<ListItemIcon >
						<PlagiarismIcon color="info" fontSize='medium' sx={{ ml: 3 }} />
					</ListItemIcon>
					<ListItemText primary="Histórico" primaryTypographyProps={{ variant: "subtitle1", ml: 1 }} />
				</ListItemButton>
			</ListItem>

		</List>
	)
}

export default BarraLateral;
