import React from 'react';
import { logoutHandler } from './shared/customUtils';

class Home extends React.Component {

	state = {
		name: "First Project"
	};

	render() {
		return <div>
			<h1>welcome Raghav</h1>
			<button type="button" onClick={logoutHandler}>Logout</button>
		</div>
	}
}

export default Home;