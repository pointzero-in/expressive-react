import { fromJS } from 'immutable';

const initialState = fromJS({
	todos: [],
});

const LoginReducer = (state = initialState, action) => {
	switch (action.type) {
	case 'SET_TODOS':
		return state.set('todos', fromJS(action.payload));

	default: return state;
	}
};

export default LoginReducer;
