import { fromJS } from 'immutable';

const initialState = fromJS({
	globalState: {
		state: 'LOADING',
	},
});

const RootReducer = (state = initialState, action) => {
	switch (action.type) {
	default:
		return state;
	}
};

export default RootReducer;
