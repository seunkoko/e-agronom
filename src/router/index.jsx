import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import store, { history } from '../utils/configureStore';

import Home from '../pages/Home/Home';

const AppContainer = (
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Switch>
				<Route component={Home} />
			</Switch>
		</ConnectedRouter>
	</Provider>
);

export default AppContainer;
