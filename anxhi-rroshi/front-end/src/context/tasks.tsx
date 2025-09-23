'use client';

import { createTask, getAllTasks, updateTask, deleteTask as deleteTaskAPI } from '@/query/tasks';
import { arrayMove } from '@dnd-kit/sortable';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

type ContextT = {
	tasks: TaskT[];
	addTask: (data: TaskT) => void;
	updateTask: (data: TaskT) => void;
	swap: (data: { oldIdx: number; newIdx: number }) => void;
	deleteTask: (id: string) => void;
};

const DEFAULT_VALUES: ContextT = {
	tasks: [],
	addTask: () => {},
	updateTask: () => {},
	swap: () => {},
	deleteTask: () => {},
};

const Context = createContext<ContextT>(DEFAULT_VALUES);

const TasksProvider = (props: PropsWithChildren) => {
	const [tasks, setTasks] = useState(DEFAULT_VALUES.tasks);

	const addTask = (data: TaskT) => {
		setTasks((prev) => [...prev, data]);
		createTask(data);
	};

	const editTask = (data: TaskT) => {
		updateTask(data);
		setTasks((prev) =>
			prev.map((task) => {
				const found = task.id === data.id;

				if (!found) return task;

				return {
					prev,
					...data,
				};
			})
		);
	};

	const swap: ContextT['swap'] = ({ newIdx, oldIdx }) => {
		setTasks((prev) => {
			// TODO: dont depent on dnd kit lib, use js
			return arrayMove(prev, oldIdx, newIdx);
		});
	};

	const deleteTask: ContextT['deleteTask'] = (id) => {
		setTasks((prev) => prev.filter((p) => p.id !== id));
		deleteTaskAPI(id);
	};

	useEffect(() => {
		getAllTasks().then((data) => {
			setTasks(data);
		});
	}, []);
	return (
		<Context.Provider
			value={{
				tasks,
				addTask,
				swap,
				deleteTask,
				updateTask: editTask,
			}}
		>
			{props.children}
		</Context.Provider>
	);
};

const useTasks = () => useContext(Context);

export { TasksProvider, useTasks };
