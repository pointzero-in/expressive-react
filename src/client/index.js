import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { AppContainer } from 'react-hot-loader';

import History from './History';
import Store from './Store/Store';
import App from './App';
import './styles.css';

const wrapApp = AppComponent => (
	<AppContainer>
		<Provider store={Store}>
			<ConnectedRouter history={History}>
				<AppComponent />
			</ConnectedRouter>
		</Provider>
	</AppContainer>
);
ReactDOM.render(wrapApp(App), document.getElementById('root'));

if (module.hot) {
	// flow-disable-next-line
	module.hot.accept('./App', () => {
		// eslint-disable-next-line global-require
		const NextApp = require('./App').default;
		ReactDOM.render(wrapApp(NextApp), document.getElementById('root'));
	});
}
