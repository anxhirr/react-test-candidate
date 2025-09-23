'use client';

import { AgGridReact } from 'ag-grid-react';
import type { ColDef } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { useTasks } from '@/context/tasks';
import { DeleteTaskBtn, EditTaskBtn, ExportExcelBtn, NewTaskBtn } from '../buttons';
import { FileDownIcon, SearchIcon } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useStatusParam } from '@/hooks/use-status-param';
import { useMemo } from 'react';

ModuleRegistry.registerModules([AllCommunityModule]);

// TODO: find the right type
const Actions = (props: any) => {
	return (
		<div className="flex gap-3">
			<EditTaskBtn id={props.value} />
			<DeleteTaskBtn id={props.value} />
		</div>
	);
};

const columnDefs: ColDef[] = [
	{ field: 'taskNo', rowDrag: true },
	{ field: 'category' },
	{ field: 'assignedTo' },
	{ field: 'notes' },
	{ field: 'status' },
	{ field: 'title' },
	{
		headerName: 'Action',
		field: 'id',
		cellRenderer: Actions,
	},
];

const TasksNewTable = () => {
	const statusParam = useStatusParam();
	const { tasks, swap } = useTasks();

	const rowData = useMemo(() => {
		if (!statusParam) return tasks;
		return tasks.filter((d) => d.status === statusParam);
	}, [statusParam, tasks]);

	return (
		<div className="h-dvh w-full">
			<div className="flex gap-3 mb-3">
				<div className="relative w-full flex-1">
					<SearchIcon className="absolute left-2 top-[50%] translate-y-[-50%]" size={15} />
					<Input type="text" placeholder="Search..." className="max-w-md ps-8" />
				</div>
				<ExportExcelBtn />
				<NewTaskBtn />
			</div>
			<AgGridReact
				rowData={rowData}
				columnDefs={columnDefs}
				onRowDragEnd={(event) => {
					const {
						overIndex,
						node: { data },
					} = event;
					swap({
						newIdx: overIndex,
						oldIdx: tasks.map(({ id }) => id).indexOf(data.id),
					});
				}}
			/>
		</div>
	);
};

export { TasksNewTable };
