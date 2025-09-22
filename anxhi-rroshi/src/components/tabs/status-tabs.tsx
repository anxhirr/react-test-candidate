'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useStatusParam } from '@/hooks/use-status-param';
import Link from 'next/link';

const STATUS_LIST: TaskT['status'][] = ['NEW', 'IN_PROGRESS', 'ON_HOLD', 'CACELLED', 'COMPLETED'];

const StatusTabs = () => {
	const status = useStatusParam();
	return (
		<div className="flex w-full max-w-sm flex-col gap-6">
			<Tabs defaultValue={status}>
				<TabsList>
					{STATUS_LIST.map((status) => {
						return (
							<Link key={status} href={`?status=${status}`}>
								<TabsTrigger value={status}>{status}</TabsTrigger>
							</Link>
						);
					})}
				</TabsList>
			</Tabs>
		</div>
	);
};

export { StatusTabs };
