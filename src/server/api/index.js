const api = function(app, db) {
	app.post('/api', (req, res) => {
		res.send(req.body);
	});
}

export default api;
