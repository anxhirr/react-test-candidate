const API = 'http://localhost:5000/api/tasks';

const getAllTasks = async () => {
	const res = await fetch(API);
	const data = await res.json();
	return data as TaskT[];
};

const createTask = async (task: TaskT) => {
	const res = await fetch(API, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(task),
	});
	const data = await res.json();
	if (!res.ok) throw data;
	return data as {
		status: 'success' | 'error';
		data: TaskT;
	};
};

const updateTask = async (task: TaskT) => {
	const res = await fetch(API + '/' + task.id, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(task),
	});
	const data = await res.json();
	if (!res.ok) throw data;
	return data as {
		status: 'success' | 'error';
		data: TaskT;
	};
};

const deleteTask = async (id: string) => {
	const res = await fetch(API + '/' + id, {
		method: 'DELETE',
	});
	const data = await res.json();
	if (!res.ok) throw data;
	return data as {
		status: 'success' | 'error';
		data: TaskT;
	};
};

export { getAllTasks, createTask, updateTask, deleteTask };
