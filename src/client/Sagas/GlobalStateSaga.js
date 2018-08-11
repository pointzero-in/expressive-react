import {
	takeLatest, put, all,
} from 'redux-saga/effects';

function* fetchGlobalState() {
	try {
		yield put({ type: 'SOME_ACTION' });
	} catch (error) {
		console.log("error", error);
	}
}

export default function* globalStateWatcher() {
	yield all([
		yield takeLatest('FETCH_GLOBAL_STATE', fetchGlobalState),
	]);
}
