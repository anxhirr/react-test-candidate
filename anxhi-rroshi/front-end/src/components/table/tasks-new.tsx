'use client';

import { AgGridReact } from 'ag-grid-react';
import type { ColDef } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { useTasks } from '@/context/tasks';
import { DeleteTaskBtn, EditTaskBtn, ExportExcelBtn, NewTaskBtn } from '../buttons';
import { SearchIcon } from 'lucide-react';
import { Input } from '../ui/input';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { statusToColor } from '@/lib/colors';
import { statusToLabel } from '@/lib/labels';
import { Badge } from '../ui/badge';

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

// TODO: find the right type
const Status = (props: any) => {
	const value = props.value;
	return (
		<Badge
			style={{
				backgroundColor: statusToColor(value),
			}}
		>
			{statusToLabel(value)}
		</Badge>
	);
};

// TODO: find the right type
const Notes = (props: any) => {
	const value = props.value;
	return (
		<div
			dangerouslySetInnerHTML={{
				__html: value,
			}}
		/>
	);
};

const columnDefs: ColDef[] = [
	{ field: 'taskNo', rowDrag: true },
	{ field: 'category' },
	{ field: 'assignedTo' },
	{ field: 'notes', cellRenderer: Notes },
	{ field: 'status', cellRenderer: Status },
	{ field: 'title' },
	{
		headerName: 'Action',
		field: 'id',
		cellRenderer: Actions,
	},
];

const TasksNewTable = () => {
	const router = useRouter();
	const params = useSearchParams();
	const { tasks, swap } = useTasks();
	const [quickFilterText, setQuickFilterText] = useState(params.get('search') || '');

	return (
		<div className="p-3">
			<div className="flex gap-3 mb-3">
				<div className="relative w-full flex-1">
					<SearchIcon className="absolute left-2 top-[50%] translate-y-[-50%]" size={15} />
					<Input
						type="text"
						placeholder="Search..."
						className="max-w-md ps-8"
						onChange={(e) => {
							const { value } = e.target;
							const allParams = new URLSearchParams(params);
							if (value) {
								allParams.set('search', value);
							} else {
								allParams.delete('search');
							}

							router.push(`/?${allParams.toString()}`);
							setQuickFilterText(value);
						}}
						value={quickFilterText}
					/>
				</div>
				<ExportExcelBtn />
				<NewTaskBtn />
			</div>
			<div>
				<AgGridReact
					rowData={tasks}
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
					// quickFilterText={quickFilterText}
				/>
			</div>
		</div>
	);
};

export { TasksNewTable };
