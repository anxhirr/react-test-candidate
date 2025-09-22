import { TasksTable } from '@/components/table';
import { StatusTabs } from '@/components/tabs';

export default function Home() {
	return (
		<>
			<StatusTabs />
			<TasksTable />
		</>
	);
}
