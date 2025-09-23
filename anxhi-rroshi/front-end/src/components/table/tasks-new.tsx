'use client';

import { AgGridReact } from 'ag-grid-react';
import type { ColDef } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { useTasks } from '@/context/tasks';
import { DeleteTaskBtn, EditTaskBtn } from '../buttons';

ModuleRegistry.registerModules([AllCommunityModule]);

// TODO: find the right type
const Actions = (props: any) => {
	console.log('props', props.value);

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
	const { tasks, swap } = useTasks();

	return (
		<div className="h-dvh w-full">
			<AgGridReact
				rowData={tasks}
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
