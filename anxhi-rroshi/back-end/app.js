const express = require('express');
const jsonServer = require('json-server');
const path = require('path');
const app = express();
const cors = require('cors');
const exceljs = require('exceljs');
const fs = require('fs');
const jwt = require('jsonwebtoken');
// const { authenticateToken } = require('./middleware/auth');

const port = 5000;

const dbPath = path.join(__dirname, 'db.json');
const dbRouter = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults();

app.use(cors());
app.use(middlewares);
app.use('/api', dbRouter);

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.get('/export-excel', async (req, res) => {
	const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
	const jsonData = dbData.tasks;

	const workbook = new exceljs.Workbook();
	const worksheet = workbook.addWorksheet('Tasks');

	if (jsonData.length > 0) {
		worksheet.columns = Object.keys(jsonData[0]).map((key) => ({
			header: key.charAt(0).toUpperCase() + key.slice(1),
			key: key,
			width: 30,
		}));
	}

	worksheet.addRows(jsonData);

	res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

	await workbook.xlsx.write(res);
	res.end();
});

app.post('/login', express.json(), (req, res) => {
	const { username, password } = req.body;

	const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

	const user = dbData.users.find((u) => u.username === username && u.password === password);

	if (!user) {
		return res.status(401).json({ message: 'Invalid credentials' });
	}

	const payload = { id: user.id, username: user.username };
	const token = jwt.sign(payload, 'secret', { expiresIn: '1h' });

	res.json({ token });
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
