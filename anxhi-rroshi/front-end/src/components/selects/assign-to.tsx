'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DUMMY_TASKS } from '@/data/dummy';

const AssignToSelect = ({ onValueChange, value }: { onValueChange: (value: string) => void; value: string }) => {
	return (
		<Select onValueChange={onValueChange} defaultValue={value}>
			<SelectTrigger className="w-full">
				<div className="flex items-center gap-2">
					<SelectValue placeholder="Select user" />
				</div>
			</SelectTrigger>
			<SelectContent>
				{DUMMY_TASKS.map((dummyData) => {
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
