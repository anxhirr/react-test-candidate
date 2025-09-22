'use client';

import { useTasks } from '@/context/tasks';
import { useStatusParam } from '@/hooks/use-status-param';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { statusToColor } from '@/lib/colors';
import { statusToLabel } from '@/lib/labels';

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

				const color = statusToColor(status);
				return (
					<Button
						key={status}
						onClick={() => {
							router.push(isActive ? '/' : `?status=${status}`);
						}}
						variant={isActive ? 'default' : 'outline'}
						className="flex-col h-32 w-60 text-white hover:text-white"
						style={{
							color: isActive ? undefined : color,
							borderColor: color,
							backgroundColor: isActive ? color : undefined,
						}}
					>
						<span>{filteredTasks.length}</span>
						<span>{statusToLabel(status)}</span>
					</Button>
				);
			})}
		</div>
	);
};

export { StatusTabs };
