import { api } from './index.js'

export const pegaInputsGanhos = () => {
	return api.get('/ganhos');
}

export const deletaGanhos = (id) => {
	return api.delete(`/ganhos/deleta-ganhos/${id}`);
}

export const addGanhos = (itens) => {
	return api.post('/ganhos/adicionarGanhos', itens);
}