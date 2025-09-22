import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const STATUS_LIST = ['NEW', 'IN_PROGRESS', 'ON_HOLD', 'CACELLED', 'COMPLETED'];

const StatusTabs = () => {
	return (
		<div className="flex w-full max-w-sm flex-col gap-6">
			<Tabs defaultValue="account">
				<TabsList>
					{STATUS_LIST.map((status) => {
						return (
							<TabsTrigger key={status} value={status}>
								{status}
							</TabsTrigger>
						);
					})}
				</TabsList>
			</Tabs>
		</div>
	);
};

export { StatusTabs };
