const express = require('express');
const { DUMMY_TASKS } = require('./dummy');
const app = express();
const cors = require('cors');
const port = 5000;

app.use(cors());

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.get('/tasks', (req, res) => {
	res.json({ status: 'success', data: DUMMY_TASKS });
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
