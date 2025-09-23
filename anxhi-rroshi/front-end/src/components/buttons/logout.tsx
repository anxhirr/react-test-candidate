'use client';

import { logoutAction } from '@/app/actions/logout';
import { Button } from '@/components/ui/button';
import { LogOutIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const LogoutBtn = () => {
	const router = useRouter();
	return (
		<Button
			onClick={async () => {
				try {
					await logoutAction();
					router.refresh();
				} catch (error) {
					toast.error('An error happened');
				}
			}}
			variant="outline"
			className="m-2"
		>
			<LogOutIcon />
			Logout
		</Button>
	);
};

export { LogoutBtn };
