import Todo from '../models/todo';

export function getTodos(req, res) {
	Todo.find().sort('-created')
		.exec((error, todos) => {
			if (error) {
				res.json({ success: false, error });
			}
			res.json({ success: true, todos });
		});
}

export function addTodo(req, res) {
	if (!req.body.todo.name) {
		res.status(403).end();
	}

	const newTodo = new Todo(req.body.todo);
	newTodo.save((error, todo) => {
		if (error) {
			res.json({ success: false, error });
		}
		res.json({ success: true, todo });
	});
}

export function getTodo(req, res) {
	Todo.findOne({ _id: req.params.id })
		.exec((error, todo) => {
			if (error) {
				res.json({ success: false, error });
			}
			res.json({ success: true, todo });
		});
}

export function updateTodo(req, res) {
	Todo.findOneAndUpdate({ _id: req.params.id }, req.body.todo, { new: true })
		.exec((error, todo) => {
			if (error) {
				res.json({ success: false, error });
			}
			res.json({ success: true, todo });
		});
}

export function deleteTodo(req, res) {
	Todo.findOne({ _id: req.params.id })
		.exec((error, todo) => {
			if (error) {
				res.json({ success: false, error });
			}

			todo.remove(() => {
				res.status(200).end();
			});
		});
}
