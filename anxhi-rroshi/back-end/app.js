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
// app.use('/api', dbRouter);
app.use(express.json());

app.get('/api/tasks', (req, res) => {
	const { status, search } = req.query || {};
	const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
	let tasks = dbData.tasks;

	if (status) {
		tasks = tasks.filter((task) => task.status === status);
	}

	if (search) {
		const lowerSearch = search.toLowerCase();

		tasks = tasks.filter((task) => {
			return Object.entries(task).some(([key, value]) => {
				if (key === 'id') return false; // dont includ id

				return value.toString().toLowerCase().includes(lowerSearch);
			});
		});
	}

	console.log('tasks', tasks);

	res.json(tasks);
});

app.post('/swap-tasks', express.json(), (req, res) => {
	const { oldId, newId } = req.body;

	if (!oldId || !newId) {
		return res.status(400).json({ message: 'Both oldId and newId are required' });
	}

	const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
	const tasks = dbData.tasks;

	const oldIndex = tasks.findIndex((task) => task.id === oldId);
	const newIndex = tasks.findIndex((task) => task.id === newId);

	if (oldIndex === -1 || newIndex === -1) {
		return res.status(404).json({ message: 'One or both task IDs not found' });
	}

	const [movedTask] = tasks.splice(oldIndex, 1);
	tasks.splice(newIndex, 0, movedTask);

	dbData.tasks = tasks;
	fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));

	res.json({ message: 'Task moved successfully', tasks });
});

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.get('/export-excel', async (req, res) => {
	const { status } = req.query || {};
	const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

	const filteredData = status ? dbData.tasks.filter((d) => d.status === status) : dbData.tasks;

	const workbook = new exceljs.Workbook();
	const worksheet = workbook.addWorksheet('Tasks');

	if (filteredData.length > 0) {
		worksheet.columns = Object.keys(filteredData[0]).map((key) => ({
			header: key.charAt(0).toUpperCase() + key.slice(1),
			key: key,
			width: 30,
		}));
	}

	worksheet.addRows(filteredData);

	res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

	await workbook.xlsx.write(res);
	res.end();
});

app.post('/login', (req, res) => {
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

app.get('/validate-token', (req, res) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1]; // Expecting: Bearer <token>

	if (!token) {
		return res.status(401).json({
			message: 'Token is missing',
		});
	}

	jwt.verify(token, 'secret', (err, user) => {
		if (err) {
			return res.status(403).json({
				message: 'Token is invalid or expired',
			});
		}

		res.json({ message: 'Token is valid', user });
	});
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
