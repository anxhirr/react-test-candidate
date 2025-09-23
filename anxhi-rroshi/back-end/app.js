const express = require('express');
const jsonServer = require('json-server');
const path = require('path');
const app = express();
const cors = require('cors');
const port = 5000;

const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

app.use(cors());
app.use(middlewares);
app.use('/api', router);

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
