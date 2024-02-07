import { api } from './index.js'

export const getGastosFixos = () => {
	return api.get('/gastosfixos');
}

export const deletaGastosFixos = (id) => {
	return api.delete(`/gastosfixos/delet/${id}`)
}

export const addGastosFixos = (itens) => {
	return api.post('gastosfixos/add', itens)
}