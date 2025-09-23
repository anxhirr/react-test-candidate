import { TasksNewTable } from '@/components/table/tasks-new';
import { StatusTabs } from '@/components/tabs';
import { TasksProvider } from '@/context/tasks';

export default function Home() {
	return (
		<TasksProvider>
			<StatusTabs />
			<TasksNewTable />
		</TasksProvider>
	);
}
