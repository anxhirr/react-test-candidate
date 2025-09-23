const express = require('express');
const { DUMMY_TASKS } = require('./dummy');
const app = express();
const cors = require('cors');
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.get('/tasks', (req, res) => {
	res.json({ status: 'success', data: DUMMY_TASKS });
});

app.post('/tasks/new', (req, res) => {
	const body = req.body;
	console.log('body', body);
	res.json({ status: 'success', data: body });
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
