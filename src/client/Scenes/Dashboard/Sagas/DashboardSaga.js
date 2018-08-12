import {
	takeEvery, put, all, call,
} from 'redux-saga/effects';
import axios from 'axios';

import { setTodos } from '../Actions/DashboardActions';

function fetchTodos() {
	return axios.get('http://localhost:8000/api/todos');
}

function* getTodos() {
	try {
		const res = yield call(fetchTodos);
		console.log("res", res);
		if (res.data.success) {
			yield put(setTodos(res.data.todos));
		}
	} catch (error) {
		console.log("error", error);
	}
}

export default function* todosWatcher() {
	yield all([
		yield takeEvery('GET_TODOS', getTodos),
	]);
}
