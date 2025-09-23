'use client';

import { useTasks } from '@/context/tasks';
import { useStatusParam } from '@/hooks/use-status-param';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { statusToColor } from '@/lib/colors';
import { statusToLabel } from '@/lib/labels';
import { useEffect, useState } from 'react';
import { getTasksCountByStatus } from '@/query/tasks';

const STATUS_LIST: TaskT['status'][] = ['NEW', 'IN_PROGRESS', 'ON_HOLD', 'CACELLED', 'COMPLETED'];

const StatusTabs = () => {
	const router = useRouter();
	const statusParam = useStatusParam();
	const { tasks } = useTasks();
	const [tasksCount, setTasksCount] = useState<Record<TaskT['status'], number>>();

	useEffect(() => {
		getTasksCountByStatus().then((data) => {
			console.log('data', data);
			setTasksCount(data);
		});
	}, []);
	return (
		<div className="flex gap-3 p-3">
			{STATUS_LIST.map((status) => {
				const isActive = statusParam === status;

				const count = tasksCount?.[status] || 0;

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
						<span className="text-4xl">{count}</span>
						<span>{statusToLabel(status)}</span>
					</Button>
				);
			})}
		</div>
	);
};

export { StatusTabs };
