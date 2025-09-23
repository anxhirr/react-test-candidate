'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTasks } from '@/context/tasks';

const AssignToSelect = ({ onValueChange, value }: { onValueChange: (value: string) => void; value: string }) => {
	const { tasks } = useTasks();
	return (
		<Select onValueChange={onValueChange} defaultValue={value}>
			<SelectTrigger className="w-full">
				<div className="flex items-center gap-2">
					<SelectValue placeholder="Select user" />
				</div>
			</SelectTrigger>
			<SelectContent>
				{tasks.map((dummyData) => {
					return (
						<SelectItem key={dummyData.assignedTo} value={dummyData.assignedTo}>
							{dummyData.assignedTo}
						</SelectItem>
					);
				})}
			</SelectContent>
		</Select>
	);
};

export { AssignToSelect };
