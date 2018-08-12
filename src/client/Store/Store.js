import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from 'redux-saga';
import { combineReducers } from 'redux-immutable';
import { connectRouter, routerMiddleware } from 'connected-react-router/immutable';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Iterable, Map } from 'immutable';
import { createLogger } from 'redux-logger';

import History from '../History';

import RootReducer from "../Reducers/RootReducer";
import rootRunner from "../Sagas/RootSaga";
import DashboardReducer from '../Scenes/Dashboard/Reducers/DashboardReducer';

const sagaMiddleware = createSagaMiddleware();
const initialState = Map();

const stateTransformer = (state) => {
	if (Iterable.isIterable(state)) return state.toJS();
	return state;
};

const loggerMiddleware = createLogger({ stateTransformer, predicate: () => process.env.NODE_ENV === 'development' });

const middleware = () => {
	const enhancer = compose(applyMiddleware(
		sagaMiddleware,
		routerMiddleware(History),
		loggerMiddleware,
	));
	if (process.env.NODE_ENV === 'development') {
		return composeWithDevTools(enhancer);
	}
	return enhancer;
};
const Store = createStore(
	connectRouter(History)(combineReducers({
		root: RootReducer,
		dashboard: DashboardReducer,
	})),
	initialState,
	middleware(),
);

sagaMiddleware.run(rootRunner);


export default Store;
