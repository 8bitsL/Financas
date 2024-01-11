import React from 'react';
import { useSelector } from 'react-redux'

import MostradoresIniciais from './telas/mostradoresIniciais';
import Ganhos from './telas/Ganhos';
import GastosFixos from './telas/gastosFixos';
import GastosVariaveis from './telas/gastosVariaveis';



function Orquestrador() {
	const estado = useSelector((state) => state.estado);
	const { mostradoresPrincipais, mostraGanhos, mostraGastosFixos, mostraGastosVariaveis } = estado;

	return (
		<>
			{ mostradoresPrincipais && <MostradoresIniciais/> }
			{ mostraGanhos && <Ganhos/> }
			{ mostraGastosFixos && <GastosFixos/> }
			{ mostraGastosVariaveis && <GastosVariaveis/>}

		</>

	)

}

export default Orquestrador;