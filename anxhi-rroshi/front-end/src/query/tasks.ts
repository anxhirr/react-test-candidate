const API = 'http://localhost:5000/tasks';

const getTasksAPI = async ({ search, status }: { status?: TaskT['status']; search?: string } = {}) => {
	const fetchUrl = new URL(API);
	status && fetchUrl.searchParams.append('status', status);
	search && fetchUrl.searchParams.append('search', search);
	const res = await fetch(fetchUrl);
	const data = await res.json();
	return data as TaskT[];
};

const getTasksCountByStatusAPI = async () => {
	const res = await fetch('http://localhost:5000/api/task-count-by-status');
	const data = await res.json();
	return data as Record<TaskT['status'], number>;
};

const createTaskAPI = async (task: TaskT) => {
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

const swapTaskAPI = async (body: { oldId: string; newId: string }) => {
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

const updateTaskAPI = async (task: TaskT) => {
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

const deleteTaskAPI = async (id: string) => {
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

export { getTasksAPI, createTaskAPI, updateTaskAPI, deleteTaskAPI, swapTaskAPI, getTasksCountByStatusAPI };
