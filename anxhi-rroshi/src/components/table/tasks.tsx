'use client';

import React, { CSSProperties, useMemo, useState } from 'react';
import {
	CellContext,
	ColumnDef,
	Row,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	useReactTable,
} from '@tanstack/react-table';

// needed for table body level scope DnD setup
import {
	DndContext,
	KeyboardSensor,
	MouseSensor,
	TouchSensor,
	closestCenter,
	type DragEndEvent,
	type UniqueIdentifier,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

// needed for row & cell level scope DnD setup
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useStatusParam } from '@/hooks/use-status-param';
import { Input } from '../ui/input';
import jsPDF from 'jspdf';
import * as jsPDFAutotable from 'jspdf-autotable';
import { DeleteTaskBtn, NewTaskBtn } from '../buttons';
import { useTasks } from '@/context/tasks';

// Cell Component
const RowDragHandleCell = ({ rowId }: { rowId: string }) => {
	const { attributes, listeners } = useSortable({
		id: rowId,
	});
	return (
		// Alternatively, you could set these attributes on the rows themselves
		<button {...attributes} {...listeners}>
			🟰
		</button>
	);
};

// Row Component
const DraggableRow = ({ row }: { row: Row<TaskT> }) => {
	const { transform, transition, setNodeRef, isDragging } = useSortable({
		id: row.original.id,
	});

	const style: CSSProperties = {
		transform: CSS.Transform.toString(transform), //let dnd-kit do its thing
		transition: transition,
		opacity: isDragging ? 0.8 : 1,
		zIndex: isDragging ? 1 : 0,
		position: 'relative',
	};
	return (
		// connect row ref to dnd-kit, apply important styles
		<tr ref={setNodeRef} style={style}>
			{row.getVisibleCells().map((cell) => (
				<td key={cell.id} style={{ width: cell.column.getSize() }}>
					{flexRender(cell.column.columnDef.cell, cell.getContext())}
				</td>
			))}
		</tr>
	);
};

const Actions = (props: CellContext<TaskT, unknown>) => {
	const id = props.row.getValue('id') as string; // TODO: is there a better way to get the id?
	console.log('id', id);
	return (
		<>
			<DeleteTaskBtn id={id} />
		</>
	);
};

const columns: ColumnDef<TaskT>[] = [
	// Create a dedicated drag handle column. Alternatively, you could just set up dnd events on the rows themselves.
	{
		id: 'drag-handle',
		header: 'Move',
		cell: ({ row }) => <RowDragHandleCell rowId={row.id} />,
		size: 60,
	},
	{
		accessorKey: 'id',
		header: 'Id',
	},
	{
		accessorKey: 'title',
		header: 'Title',
	},
	{
		accessorKey: 'category',
		header: 'Category',
	},
	{
		accessorKey: 'assignedTo',
		header: 'AssignedTo',
	},
	{
		accessorKey: 'status',
		header: 'Status',
	},
	{
		accessorKey: 'notes',
		header: 'Notes',
	},
	{
		id: 'actions',
		cell: Actions,
	},
];

// Table Component
function TasksTable() {
	const status = useStatusParam();
	const { tasks, swap } = useTasks();

	const filteredTasks = useMemo(() => {
		return tasks.filter((d) => {
			const statusMatches = d.status === status;
			return statusMatches;
		});
	}, [status, tasks]);

	const dataIds = React.useMemo<UniqueIdentifier[]>(() => filteredTasks?.map(({ id }) => id), [filteredTasks]);

	const [globalFilter, setGlobalFilter] = useState('');

	const table = useReactTable({
		data: filteredTasks,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getRowId: (row) => row.id, //required because row indexes will change
		state: {
			globalFilter,
		},
	});

	// reorder rows after drag & drop
	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;
		if (active && over && active.id !== over.id) {
			const oldIdx = dataIds.indexOf(active.id);
			const newIdx = dataIds.indexOf(over.id);
			swap({ newIdx, oldIdx });
		}
	}

	const handleExportPdf = () => {
		const doc = new jsPDF();

		// Prepare data for AutoTable (example: array of arrays)
		const tableData = table.getRowModel().rows.map((row) => row.getVisibleCells().map((cell) => cell.getValue()));

		// Prepare headers for AutoTable (example: array of strings)
		const headerRows = table
			.getHeaderGroups()
			.map((headerGroup) =>
				headerGroup.headers.map((header) => flexRender(header.column.columnDef.header, header.getContext()))
			);

		jsPDFAutotable.autoTable(doc, {
			// TODO: This is working but fix the ts issues.
			// @ts-ignore
			head: headerRows,
			// @ts-ignore
			body: tableData,
		});

		// Save the PDF
		doc.save('tanstack-table.pdf');
	};

	const sensors = useSensors(useSensor(MouseSensor, {}), useSensor(TouchSensor, {}), useSensor(KeyboardSensor, {}));

	return (
		// NOTE: This provider creates div elements, so don't nest inside of <table> elements
		<DndContext
			collisionDetection={closestCenter}
			modifiers={[restrictToVerticalAxis]}
			onDragEnd={handleDragEnd}
			sensors={sensors}
		>
			<div className="p-2">
				<div className="h-4" />
				<Input
					type="text"
					value={globalFilter ?? ''}
					onChange={(e) => setGlobalFilter(e.target.value)}
					placeholder="Search all columns..."
				/>
				<button onClick={handleExportPdf}>Export to PDF</button>
				<NewTaskBtn />
				<table>
					<thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th key={header.id} colSpan={header.colSpan}>
										{header.isPlaceholder
											? null
											: flexRender(header.column.columnDef.header, header.getContext())}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						<SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
							{table.getRowModel().rows.map((row) => (
								<DraggableRow key={row.id} row={row} />
							))}
						</SortableContext>
					</tbody>
				</table>
			</div>
		</DndContext>
	);
}

export { TasksTable };
