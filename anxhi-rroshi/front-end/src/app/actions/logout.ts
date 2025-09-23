'use server';

import { cookies } from 'next/headers';

const logoutAction = async () => {
	const cookiesStore = await cookies();
	cookiesStore.delete('token');
};

export { logoutAction };
