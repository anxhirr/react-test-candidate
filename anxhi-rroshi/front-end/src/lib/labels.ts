const statusToLabel = (value: TaskT['status']) => {
	const MAP: Record<TaskT['status'], string> = {
		CACELLED: 'Cancelled',
		COMPLETED: 'Completed',
		IN_PROGRESS: 'In Progress',
		NEW: 'New',
		ON_HOLD: 'On Hold',
	};
	return MAP[value];
};

export { statusToLabel };
