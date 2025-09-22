'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const STATUS_LIST: TaskT['status'][] = ['NEW', 'IN_PROGRESS', 'ON_HOLD', 'CACELLED', 'COMPLETED'];

const StatusSelect = ({ onValueChange, value }: { onValueChange: (value: string) => void; value: string }) => {
	return (
		<Select onValueChange={onValueChange} defaultValue={value}>
			<SelectTrigger className="w-full">
				<div className="flex items-center gap-2">
					<SelectValue placeholder="Select user" />
				</div>
			</SelectTrigger>
			<SelectContent>
				{STATUS_LIST.map((status) => {
					return <SelectItem value={status}>{status}</SelectItem>;
				})}
			</SelectContent>
		</Select>
	);
};

export { StatusSelect };
