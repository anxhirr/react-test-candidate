'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DUMMY_TASKS } from '@/data/dummy';

const CategorySelect = ({ onValueChange, value }: { onValueChange: (value: string) => void; value: string }) => {
	return (
		<Select onValueChange={onValueChange} defaultValue={value}>
			<SelectTrigger className="w-full">
				<div className="flex items-center gap-2">
					<SelectValue placeholder="Select task category" />
				</div>
			</SelectTrigger>
			<SelectContent>
				{DUMMY_TASKS.map((dummyData) => {
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
