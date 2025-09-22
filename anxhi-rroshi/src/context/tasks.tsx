'use client';

import { makeTaskData } from '@/data/tasks';
import { arrayMove } from '@dnd-kit/sortable';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

type ContextT = {
	tasks: TaskT[];
	addTask: (data: TaskT) => void;
	swap: (data: { oldIdx: number; newIdx: number }) => void;
	deleteTask: (id: string) => void;
};

const DEFAULT_VALUES: ContextT = {
	tasks: makeTaskData(20),
	addTask: () => {},
	swap: () => {},
	deleteTask: () => {},
};

const Context = createContext<ContextT>(DEFAULT_VALUES);

const TasksProvider = (props: PropsWithChildren) => {
	const [tasks, setTasks] = useState(DEFAULT_VALUES.tasks);

	const addTask = (data: TaskT) => {
		console.log('data', data);
		setTasks((prev) => [...prev, data]);
	};

	const swap: ContextT['swap'] = ({ newIdx, oldIdx }) => {
		console.log('newIdx', newIdx);
		console.log('oldIdx', oldIdx);

		setTasks((prev) => {
			// TODO: dont depent on dnd kit lib, use js
			return arrayMove(prev, oldIdx, newIdx);
		});
	};

	const deleteTask: ContextT['deleteTask'] = (id) => {
		setTasks((prev) => prev.filter((p) => p.id !== id));
	};
	return (
		<Context.Provider
			value={{
				tasks,
				addTask,
				swap,
				deleteTask,
			}}
		>
			{props.children}
		</Context.Provider>
	);
};

const useTasks = () => useContext(Context);

export { TasksProvider, useTasks };
