import { api } from './index.js'

export const getGastosVariaveis = () => {
	return api.get('/gastosvariaveis');
}

export const deletaGastosVariaveis = (id) => {
	return api.delete(`/gastosvariaveis/delet/${id}`)
}

export const addGastosVariaveis = (itens) => {
	return api.post('gastosvariaveis/add', itens)
}