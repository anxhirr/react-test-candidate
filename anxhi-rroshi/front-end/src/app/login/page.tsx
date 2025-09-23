import { LoginFrom } from '@/components/forms/login';
import { login } from '@/query/login';
import { cookies } from 'next/headers';

export default async function Login() {
	return (
		<div className="flex justify-center items-center h-dvh">
			<LoginFrom
				onValid={async (data) => {
					'use server';
					try {
						const res = await login(data);
						const cookiesStore = await cookies();
						cookiesStore.set('token', res.token);
					} catch (error) {
						console.error('error', error);
					}
				}}
			/>
		</div>
	);
}
