'use client';

import { useSearchParam } from '@/hooks/use-search-param';
import { useStatusParam } from '@/hooks/use-status-param';
import {
	createTaskAPI,
	getTasksAPI,
	updateTaskAPI,
	deleteTaskAPI,
	swapTaskAPI,
	getTasksCountByStatusAPI,
} from '@/query/tasks';
import { arrayMove } from '@dnd-kit/sortable';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

type ContextT = {
	tasks: TaskT[];
	addTask: (data: TaskT) => void;
	updateTask: (data: TaskT) => void;
	swap: (data: { oldIdx: number; newIdx: number }) => void;
	deleteTask: (data: TaskT) => void;
	tasksCount: Record<TaskT['status'], number>;
};

const DEFAULT_VALUES: ContextT = {
	tasks: [],
	addTask: () => {},
	updateTask: () => {},
	swap: () => {},
	deleteTask: () => {},
	tasksCount: {
		CACELLED: 0,
		COMPLETED: 0,
		IN_PROGRESS: 0,
		NEW: 0,
		ON_HOLD: 0,
	},
};

const Context = createContext<ContextT>(DEFAULT_VALUES);

const TasksProvider = (props: PropsWithChildren) => {
	const statusParam = useStatusParam();
	const searchParam = useSearchParam();
	const [tasks, setTasks] = useState(DEFAULT_VALUES.tasks);
	const [tasksCount, setTasksCount] = useState<ContextT['tasksCount']>(DEFAULT_VALUES.tasksCount);

	useEffect(() => {
		getTasksCountByStatusAPI().then(setTasksCount);
	}, []);

	useEffect(() => {
		getTasksAPI({ status: statusParam || undefined, search: searchParam || undefined }).then((data) => {
			setTasks(data);
		});
	}, [statusParam, searchParam]);

	const addTask = async (data: TaskT) => {
		try {
			await createTaskAPI(data);
			setTasks((prev) => [...prev, data]);
			setTasksCount((prev) => ({
				...prev,
				[data.status]: prev[data.status] + 1,
			}));
			toast.success('Task deleted successfully');
		} catch (error) {
			toast.error('An error happened');
		}
	};

	const editTask = async (data: TaskT) => {
		try {
			await updateTaskAPI(data);
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
			toast.success('Task updated successfully');
		} catch (error) {
			toast.error('An error happened');
		}
	};

	const swap: ContextT['swap'] = ({ newIdx, oldIdx }) => {
		const oldId = tasks[oldIdx].id;
		const newId = tasks[newIdx].id;
		setTasks((prev) => {
			// TODO: dont depent on dnd kit lib, use js
			return arrayMove(prev, oldIdx, newIdx);
		});

		swapTaskAPI({
			oldId,
			newId,
		});
	};

	const deleteTask: ContextT['deleteTask'] = async ({ id, status }) => {
		try {
			await deleteTaskAPI(id);
			setTasks((prev) => prev.filter((p) => p.id !== id));
			setTasksCount((prev) => ({
				...prev,
				[status]: prev[status] - 1,
			}));
		} catch (error) {
			toast.error('An error happened');
		}
	};

	return (
		<Context.Provider
			value={{
				tasks,
				addTask,
				swap,
				deleteTask,
				updateTask: editTask,
				tasksCount,
			}}
		>
			{props.children}
		</Context.Provider>
	);
};

const useTasks = () => useContext(Context);

export { TasksProvider, useTasks };
