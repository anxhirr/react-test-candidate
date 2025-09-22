'use client';

import React, { CSSProperties, useMemo, useState } from 'react';
import {
	CellContext,
	ColumnDef,
	Row,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
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
import { DeleteTaskBtn, EditTaskBtn, NewTaskBtn } from '../buttons';
import { useTasks } from '@/context/tasks';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { FileDown, FileDownIcon, GripIcon } from 'lucide-react';
import { Badge } from '../ui/badge';
import { statusToColor } from '@/lib/colors';
import { statusToLabel } from '@/lib/labels';
import { DataTablePagination } from '../ui/data-table-pagination';

// Cell Component
const RowDragHandleCell = ({ rowId }: { rowId: string }) => {
	const { attributes, listeners } = useSortable({
		id: rowId,
	});
	return (
		// Alternatively, you could set these attributes on the rows themselves
		<Button variant="ghost" {...attributes} {...listeners}>
			<GripIcon />
		</Button>
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
		<TableRow ref={setNodeRef} style={style}>
			{row.getVisibleCells().map((cell) => (
				<TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
					{flexRender(cell.column.columnDef.cell, cell.getContext())}
				</TableCell>
			))}
		</TableRow>
	);
};

const Actions = (props: CellContext<TaskT, unknown>) => {
	const id = props.row.getValue('id') as string; // TODO: is there a better way to get the id?
	return (
		<div className="flex gap-3">
			<EditTaskBtn id={id} />
			<DeleteTaskBtn id={id} />
		</div>
	);
};

const columns: ColumnDef<TaskT>[] = [
	// Create a dedicated drag handle column. Alternatively, you could just set up dnd events on the rows themselves.
	{
		id: 'drag-handle',
		header: '',
		cell: ({ row }) => <RowDragHandleCell rowId={row.id} />,
		size: 60,
	},
	{
		accessorKey: 'id',
		header: 'Id',
		cell: (table) => {
			return table.row.index;
		},
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
		cell: ({ row }) => {
			const status = row.getValue('status') as TaskT['status'];
			return (
				<Badge
					style={{
						backgroundColor: statusToColor(status),
					}}
				>
					{statusToLabel(status)}
				</Badge>
			);
		},
	},
	{
		accessorKey: 'notes',
		header: 'Notes',
		cell: (table) => {
			const value = table.row.getValue('notes') as string;
			return (
				<div
					dangerouslySetInnerHTML={{
						__html: value,
					}}
				/>
			);
		},
	},
	{
		id: 'actions',
		header: '',
		cell: Actions,
	},
];

function TasksTable() {
	const statusParam = useStatusParam();
	const { tasks, swap } = useTasks();

	const dataIds = React.useMemo<UniqueIdentifier[]>(() => tasks.map(({ id }) => id), [tasks]);

	const data = useMemo(() => {
		if (!statusParam) return tasks;
		return tasks.filter((d) => d.status === statusParam);
	}, [statusParam, tasks]);

	const [globalFilter, setGlobalFilter] = useState('');
	const [pagination, setPagination] = useState({
		pageIndex: 0, // Initial page index
		pageSize: 10, // Initial page size
	});

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getRowId: (row) => row.id, //required because row indexes will change
		state: {
			globalFilter,
			pagination,
		},
		onPaginationChange: setPagination,
		autoResetPageIndex: false,
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
		doc.save('Tasks.pdf');
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
				<div className="flex gap-3">
					<Input
						type="text"
						value={globalFilter ?? ''}
						onChange={(e) => setGlobalFilter(e.target.value)}
						placeholder="Search..."
						className="flex-1"
					/>
					<Button onClick={handleExportPdf} variant="secondary" className="text-white">
						Export to PDF
						<FileDownIcon />
					</Button>
					<NewTaskBtn />
				</div>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id} colSpan={header.colSpan}>
										{header.isPlaceholder
											? null
											: flexRender(header.column.columnDef.header, header.getContext())}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						<SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
							{table.getRowModel().rows.map((row) => (
								<DraggableRow key={row.id} row={row} />
							))}
						</SortableContext>
					</TableBody>
				</Table>
			</div>

			<DataTablePagination table={table} />
		</DndContext>
	);
}

export { TasksTable };
