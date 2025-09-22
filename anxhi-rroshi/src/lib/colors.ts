const statusToColor = (value: TaskT['status']) => {
	const MAP: Record<TaskT['status'], string> = {
		CACELLED: '#e75651',
		COMPLETED: '#7ac14d',
		IN_PROGRESS: '#f6cb52',
		NEW: '#ee8a35',
		ON_HOLD: '#e9c466',
	};
	return MAP[value];
};

export { statusToColor };
