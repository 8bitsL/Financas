import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	mostradoresPrincipais: false,
	mostraGanhos: true,
	mostraGastosFixos: false,
	mostraGastosVariaveis: false,
	mostraInvestimentos: false
}

const resetState = (state) => {
	state.mostradoresPrincipais = false;
	state.mostraGanhos = false;
	state.mostraGastosFixos = false;
	state.mostraGastosVariaveis = false;
	state.mostraInvestimentos = false;
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
		},
		mostraInvestimentos: (state) => {
			resetState(state)
			state.mostraInvestimentos = true;
		}
	},
})


export const { mostraMostradorPrincial, mostraGanhos, mostraGastosFixos, mostraGastosVariaveis, mostraInvestimentos } = estadosApp.actions

export default estadosApp.reducer