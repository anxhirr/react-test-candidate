'use client';

import { AgGridReact } from 'ag-grid-react';
import type { ColDef } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { useTasks } from '@/context/tasks';

ModuleRegistry.registerModules([AllCommunityModule]);

const columnDefs: ColDef[] = [
	{ field: 'id', hide: true },
	{ field: 'taskNo' },
	{ field: 'category' },
	{ field: 'assignedTo' },
	{ field: 'notes' },
	{ field: 'status' },
	{ field: 'title' },
];

const TasksNewTable = () => {
	const { tasks } = useTasks();

	return (
		<div className="h-dvh w-full">
			<AgGridReact rowData={tasks} columnDefs={columnDefs} />
		</div>
	);
};

export { TasksNewTable };
