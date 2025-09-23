const API = 'http://localhost:5000/tasks';

const getAllTasks = async () => {
	const res = await fetch(API);
	const data = await res.json();
	console.log('data', data);
	return data as {
		status: 'success' | 'error';
		data: TaskT[];
	};
};

const createTask = async (task: TaskT) => {
	const res = await fetch(API + '/new', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(task),
	});
	const data = await res.json();
	return data as {
		status: 'success' | 'error';
		data: TaskT;
	};
};

export { getAllTasks, createTask };
