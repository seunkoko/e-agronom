import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from '../pages/Home/Home';

const AppContainer = (
	<BrowserRouter>
		<Switch>
			<Route component={Home} />
		</Switch>
	</BrowserRouter>
);

export default AppContainer;
