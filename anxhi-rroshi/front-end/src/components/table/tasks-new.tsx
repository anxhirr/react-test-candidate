'use client';

import { AgGridReact } from 'ag-grid-react';
import type { ColDef } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { useTasks } from '@/context/tasks';
import { DeleteTaskBtn, EditTaskBtn, ExportExcelBtn, NewTaskBtn } from '../buttons';
import { SearchIcon } from 'lucide-react';
import { Input } from '../ui/input';
import { useStatusParam } from '@/hooks/use-status-param';
import { useMemo, useState } from 'react';

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
	const [quickFilterText, setQuickFilterText] = useState('');

	const rowData = useMemo(() => {
		if (!statusParam) return tasks;
		return tasks.filter((d) => d.status === statusParam);
	}, [statusParam, tasks]);

	return (
		<div className="p-3">
			<div className="flex gap-3 mb-3">
				<div className="relative w-full flex-1">
					<SearchIcon className="absolute left-2 top-[50%] translate-y-[-50%]" size={15} />
					<Input
						type="text"
						placeholder="Search..."
						className="max-w-md ps-8"
						onChange={(e) => setQuickFilterText(e.target.value)}
						value={quickFilterText}
					/>
				</div>
				<ExportExcelBtn />
				<NewTaskBtn />
			</div>
			<div>
				<AgGridReact
					rowData={rowData}
					columnDefs={columnDefs}
					onRowDragEnd={(event) => {
						const { node, overNode } = event;

						if (!overNode) return;

						const draggedId = node.data.id;
						const targetId = overNode.data.id;

						const oldIdx = tasks.findIndex((t) => t.id === draggedId);
						const newIdx = tasks.findIndex((t) => t.id === targetId);

						if (oldIdx === -1 || newIdx === -1) return;

						swap({ oldIdx, newIdx });
					}}
					pagination
					paginationPageSize={10}
					paginationPageSizeSelector={[10, 20, 50]}
					domLayout="autoHeight"
					quickFilterText={quickFilterText}
				/>
			</div>
		</div>
	);
};

export { TasksNewTable };
