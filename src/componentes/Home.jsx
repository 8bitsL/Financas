import React from 'react';
import './Home.css';

import BarraLateral from './BarraLateral';
import MostraMes from './MostraMes';
import Orquestrador from './Orquestrador';

function Home() {
	
	return (

		<div className="homePrincipal">
			<BarraLateral />
		<div className="organizacaoPrincipal">
			<MostraMes />
			<Orquestrador/>
		</div>

		</div>


	)
}

export default Home;