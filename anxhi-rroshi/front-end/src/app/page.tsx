import { LogoutBtn } from '@/components/buttons/logout';
import { TasksNewTable } from '@/components/table/tasks-new';
import { StatusTabs } from '@/components/tabs';
import { TasksProvider } from '@/context/tasks';

export default function Home() {
	return (
		<TasksProvider>
			<div className="flex justify-between">
				<StatusTabs />
				<LogoutBtn />
			</div>
			<TasksNewTable />
		</TasksProvider>
	);
}
