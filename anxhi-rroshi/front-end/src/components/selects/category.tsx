'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTasks } from '@/context/tasks';

const CategorySelect = ({ onValueChange, value }: { onValueChange: (value: string) => void; value: string }) => {
	const { tasks } = useTasks();
	return (
		<Select onValueChange={onValueChange} defaultValue={value}>
			<SelectTrigger className="w-full">
				<div className="flex items-center gap-2">
					<SelectValue placeholder="Select task category" />
				</div>
			</SelectTrigger>
			<SelectContent>
				{tasks.map((dummyData) => {
					return (
						<SelectItem key={dummyData.category} value={dummyData.category}>
							{dummyData.category}
						</SelectItem>
					);
				})}
			</SelectContent>
		</Select>
	);
};

export { CategorySelect };
