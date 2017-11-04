'use strict';

import Todo from '../models/todo';

export function getTodos(req, res) {
	Todo.find().sort('-created')
	.exec((err, todos) => {
		if (err) {
			res.status(500).send(err);
		}
		res.json({ todos });
	});
}

export function addTodo(req, res) {
	if (!req.body.todo.name) {
		res.status(403).end();
	}

	const newTodo = new Todo(req.body.todo);
	newTodo.save((err, todo) => {
		if (err) {
			res.status(500).send(err);
		}
		res.json({ todo });
	});
}

export function getTodo(req, res) {
	Todo.findOne({ _id: req.params.id })
	.exec((err, todo) => {
		if (err) {
			res.status(500).send(err);
		}
		res.json({ todo });
	});
}

export function updateTodo(req, res) {
	Todo.findOneAndUpdate({ _id: req.params.id}, req.body.todo, {new: true})
	.exec((err, todo) => {
		if (err) {
			res.status(500).send(err);
		}
		res.json({todo});
	})
}

export function deleteTodo(req, res) {
	Todo.findOne({ _id: req.params.id })
	.exec((err, todo) => {
		if (err) {
			res.status(500).send(err);
		}

		todo.remove(() => {
			res.status(200).end();
		});
	});
}
