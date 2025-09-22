'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTasks } from '@/context/tasks';
import { useStatusParam } from '@/hooks/use-status-param';
import Link from 'next/link';

const STATUS_LIST: TaskT['status'][] = ['NEW', 'IN_PROGRESS', 'ON_HOLD', 'CACELLED', 'COMPLETED'];

const StatusTabs = () => {
	const status = useStatusParam();
	const { tasks } = useTasks();
	return (
		<div className="flex w-full max-w-sm flex-col gap-6">
			<Tabs defaultValue={status}>
				<TabsList>
					{STATUS_LIST.map((status) => {
						const filteredTasks = tasks.filter((d) => {
							const statusMatches = d.status === status;
							return statusMatches;
						});
						return (
							<Link key={status} href={`?status=${status}`}>
								<TabsTrigger value={status}>
									{status} ( {filteredTasks.length} )
								</TabsTrigger>
							</Link>
						);
					})}
				</TabsList>
			</Tabs>
		</div>
	);
};

export { StatusTabs };
