'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTasks } from '@/context/tasks';
import { useStatusParam } from '@/hooks/use-status-param';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

const STATUS_LIST: TaskT['status'][] = ['NEW', 'IN_PROGRESS', 'ON_HOLD', 'CACELLED', 'COMPLETED'];

const StatusTabs = () => {
	const router = useRouter();
	const statusParam = useStatusParam();
	const { tasks } = useTasks();
	return (
		<div className="flex gap-3 p-3">
			{STATUS_LIST.map((status) => {
				const filteredTasks = tasks.filter((d) => {
					const statusMatches = d.status === status;
					return statusMatches;
				});
				const isActive = statusParam === status;
				return (
					<Button
						key={status}
						onClick={() => {
							router.push(isActive ? '/' : `?status=${status}`);
						}}
						variant={isActive ? 'default' : 'outline'}
					>
						{status} ( {filteredTasks.length} )
					</Button>
				);
			})}
		</div>
	);
};

export { StatusTabs };
