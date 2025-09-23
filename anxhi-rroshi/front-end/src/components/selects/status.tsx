'use client';

import { statusToColor } from '@/lib/colors';
import { statusToLabel } from '@/lib/labels';
import { cn } from '@/lib/utils';

const STATUS_LIST: TaskT['status'][] = ['NEW', 'IN_PROGRESS', 'ON_HOLD', 'CACELLED', 'COMPLETED'];

const StatusSelect = ({ onValueChange, value }: { onValueChange: (value: string) => void; value: string }) => {
	return (
		<div className="flex justify-center">
			{STATUS_LIST.map((status) => {
				const isActive = value === status;
				const isFirst = STATUS_LIST.indexOf(status) === 0;
				const isLast = STATUS_LIST.indexOf(status) === STATUS_LIST.length - 1;

				const color = statusToColor(status);
				return (
					<div className="relative" key={status}>
						<button
							type="button"
							onClick={() => {
								onValueChange(status);
							}}
							style={{
								borderColor: color,
								backgroundColor: color,
								color: 'white',
							}}
							className={cn(
								'p-5 status-button min-w-[12rem] h-[66px] gap-2 select-none cursor-pointer',
								isFirst && 'rounded-l-full',
								isLast && 'rounded-r-full'
							)}
						>
							<span>{statusToLabel(status)}</span>
						</button>
						<div
							className={cn(
								'w-0 h-0 border-t-[33px] border-t-transparent border-l-[50px] border-b-[33px] border-b-transparent',
								'absolute top-0 -right-[50px] z-10',
								isLast && 'hidden'
							)}
							style={{
								borderLeftColor: color,
							}}
						/>
					</div>
				);
			})}
		</div>
	);
};

export { StatusSelect };
