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
	if (!res.ok) throw data;
	return data;
};

const validateToken = async (token: string | undefined) => {
	const res = await fetch('http://localhost:5000/validate-token', {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});
	if (!res.ok) return false;
	return true;
};

export { login, validateToken };
