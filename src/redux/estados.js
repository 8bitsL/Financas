import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	mostradoresPrincipais: false,
	mostraGanhos: true,
	mostraGastosFixos: false,
	mostraGastosVariaveis: false
}

const resetState = (state) => {
	state.mostradoresPrincipais = false;
	state.mostraGanhos = false;
	state.mostraGastosFixos = false;
	state.mostraGastosVariaveis = false;
}

export const estadosApp = createSlice({
	name: 'estado',
	initialState,
	reducers: {
		mostraMostradorPrincial: (state) => {
			resetState(state)
			state.mostradoresPrincipais = true;
		},
		mostraGanhos: (state) => {
			resetState(state)
			state.mostraGanhos = true;
		},
		mostraGastosFixos: (state) => {
			resetState(state)
			state.mostraGastosFixos = true;
		},
		mostraGastosVariaveis: (state) => {
			resetState(state)
			state.mostraGastosVariaveis = true;
		}
	},
})


export const { mostraMostradorPrincial, mostraGanhos, mostraGastosFixos, mostraGastosVariaveis } = estadosApp.actions

export default estadosApp.reducer