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

export { getAllTasks };
