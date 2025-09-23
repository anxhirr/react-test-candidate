const API = 'http://localhost:5000/api/tasks';

const getTasks = async (status?: TaskT['status']) => {
	const fetchUrl = new URL(API);
	status && fetchUrl.searchParams.append('status', status);
	const res = await fetch(fetchUrl);
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

const swapTask = async (body: { oldId: string; newId: string }) => {
	const res = await fetch('http://localhost:5000/swap-tasks', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	});
	const data = await res.json();
	if (!res.ok) throw data;
	return data;
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

export { getTasks, createTask, updateTask, deleteTask, swapTask };
