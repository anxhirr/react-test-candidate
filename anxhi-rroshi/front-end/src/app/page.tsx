import { TasksTable } from '@/components/table';
import { StatusTabs } from '@/components/tabs';
import { TasksProvider } from '@/context/tasks';

export default function Home() {
	return (
		<TasksProvider>
			<StatusTabs />
			<TasksTable />
		</TasksProvider>
	);
}
