'use client';

import { useSearchParam } from '@/hooks/use-search-param';
import { useStatusParam } from '@/hooks/use-status-param';
import { createTask, getTasks, updateTask, deleteTask as deleteTaskAPI, swapTask } from '@/query/tasks';
import { arrayMove } from '@dnd-kit/sortable';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

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
	const statusParam = useStatusParam();
	const searchParam = useSearchParam();
	const [tasks, setTasks] = useState(DEFAULT_VALUES.tasks);

	const addTask = async (data: TaskT) => {
		try {
			await createTask(data);
			setTasks((prev) => [...prev, data]);
			toast.success('Task deleted successfully');
		} catch (error) {
			toast.error('An error happened');
		}
	};

	const editTask = async (data: TaskT) => {
		try {
			await updateTask(data);
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

		swapTask({
			oldId,
			newId,
		});
	};

	const deleteTask: ContextT['deleteTask'] = async (id) => {
		try {
			await deleteTaskAPI(id);
			setTasks((prev) => prev.filter((p) => p.id !== id));
		} catch (error) {
			toast.error('An error happened');
		}
	};

	useEffect(() => {
		getTasks({ status: statusParam || undefined, search: searchParam || undefined }).then((data) => {
			setTasks(data);
		});
	}, [statusParam, searchParam]);
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
