import { fork, all } from 'redux-saga/effects';
import globalStateWatcher from './GlobalStateSaga';

export default function* rootRunner() {
	yield all([
		fork(globalStateWatcher),
	]);
}
