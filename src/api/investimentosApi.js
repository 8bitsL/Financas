import api from './index.js'

export const getInvestimentos = () => {
	return api.get('/investimentos');
}

export const deletaInvestimentos = (id) => {
	return api.delete(`/investimentos/delet/${id}`)
}

export const addInvestimentos = (itens) => {
	return api.post('investimentos/add', itens)
}