'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { statusToColor } from '@/lib/colors';
import { Button } from '../ui/button';
import { statusToLabel } from '@/lib/labels';

const STATUS_LIST: TaskT['status'][] = ['NEW', 'IN_PROGRESS', 'ON_HOLD', 'CACELLED', 'COMPLETED'];

const StatusSelect = ({ onValueChange, value }: { onValueChange: (value: string) => void; value: string }) => {
	return (
		<div className="flex">
			{STATUS_LIST.map((status) => {
				const isActive = value === status;

				const color = statusToColor(status);
				return (
					<Button
						type="button"
						key={status}
						onClick={() => {
							onValueChange(status);
						}}
						variant={isActive ? 'default' : 'outline'}
						style={{
							color: isActive ? undefined : color,
							borderColor: color,
							backgroundColor: isActive ? color : undefined,
						}}
					>
						<span>{statusToLabel(status)}</span>
					</Button>
				);
			})}
		</div>
	);
};

export { StatusSelect };
