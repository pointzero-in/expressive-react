import { fork, all } from 'redux-saga/effects';
import globalStateWatcher from './GlobalStateSaga';
import todosWatcher from '../Scenes/Dashboard/Sagas/DashboardSaga';

export default function* rootRunner() {
	yield all([
		fork(globalStateWatcher),
		fork(todosWatcher),
	]);
}
