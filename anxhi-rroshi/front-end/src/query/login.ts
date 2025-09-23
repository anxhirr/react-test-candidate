const API = 'http://localhost:5000/login';

const login = async (auth: { username: string; password: string }) => {
	const res = await fetch(API, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(auth),
	});
	const data = await res.json();
	return data;
};

export { login };
