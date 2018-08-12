export const getTodos = () => ({
	type: "GET_TODOS",
});

export const setTodos = todos => ({
	type: "SET_TODOS",
	payload: todos,
});
