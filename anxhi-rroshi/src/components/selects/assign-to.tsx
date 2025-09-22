'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { makeTaskData } from '@/data/tasks';

const AssignToSelect = ({ onValueChange, value }: { onValueChange: (value: string) => void; value: string }) => {
	return (
		<Select onValueChange={onValueChange} defaultValue={value}>
			<SelectTrigger className="w-full">
				<div className="flex items-center gap-2">
					<SelectValue placeholder="Select user" />
				</div>
			</SelectTrigger>
			<SelectContent>
				{makeTaskData(10).map((dummyData) => {
					return <SelectItem value={dummyData.assignedTo}>{dummyData.assignedTo}</SelectItem>;
				})}
			</SelectContent>
		</Select>
	);
};

export { AssignToSelect };
