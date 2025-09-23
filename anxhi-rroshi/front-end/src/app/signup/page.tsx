import { AuthFrom } from '@/components/forms/login';
import { login, signup } from '@/query/login';
import { cookies } from 'next/headers';

export default async function Signup() {
	return (
		<div className="flex justify-center items-center h-dvh">
			<AuthFrom
				onValid={async (data) => {
					'use server';
					const res = await signup(data);
					const cookiesStore = await cookies();
					cookiesStore.set('token', res.token);
				}}
				isSignup
			/>
		</div>
	);
}
