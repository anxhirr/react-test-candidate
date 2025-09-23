'use client';

import { logoutAction } from '@/app/actions/logout';
import { Button } from '@/components/ui/button';
import { LogOutIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

const LogoutBtn = () => {
	const router = useRouter();
	return (
		<Button
			onClick={async () => {
				try {
					await logoutAction();
					router.refresh();
				} catch (error) {
					console.error('error', error);
				}
			}}
			variant="outline"
			className="mt-2"
		>
			<LogOutIcon />
			Logout
		</Button>
	);
};

export { LogoutBtn };
