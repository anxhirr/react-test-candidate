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
	const [rerender, setRerender] = useState(0);

	useEffect(() => {
		getTasksCountByStatusAPI().then(setTasksCount);
	}, [rerender]);

	useEffect(() => {
		getTasksAPI({ status: statusParam || undefined, search: searchParam || undefined }).then((data) => {
			setTasks(data);
		});
	}, [statusParam, searchParam, rerender]);

	const addTask = async (data: TaskT) => {
		try {
			await createTaskAPI(data);
			setRerender((p) => p + 1);
			toast.success('Task deleted successfully');
		} catch (error) {
			toast.error('An error happened');
		}
	};

	const editTask = async (data: TaskT) => {
		try {
			await updateTaskAPI(data);
			setRerender((p) => p + 1);
			toast.success('Task updated successfully');
		} catch (error) {
			toast.error('An error happened');
		}
	};

	const swap: ContextT['swap'] = async ({ newIdx, oldIdx }) => {
		try {
			const oldId = tasks[oldIdx].id;
			const newId = tasks[newIdx].id;
			await swapTaskAPI({
				oldId,
				newId,
			});
			setRerender((p) => p + 1);
			toast.success('Task swapped successfully');
		} catch (error) {
			toast.error('An error happened');
		}
	};

	const deleteTask: ContextT['deleteTask'] = async ({ id, status }) => {
		try {
			await deleteTaskAPI(id);
			setRerender((p) => p + 1);
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
