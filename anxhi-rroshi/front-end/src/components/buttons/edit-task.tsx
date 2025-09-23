'use client';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { TaskFrom } from '../forms';
import { useTasks } from '@/context/tasks';
import { useMemo, useState } from 'react';
import { PencilIcon } from 'lucide-react';

const EditTaskBtn = ({ id }: { id: string }) => {
	const { tasks, updateTask } = useTasks();
	const [isOpen, setIsOpen] = useState(false);

	const data = useMemo(() => tasks.find((t) => t.id === id), []); // TODO: is this best approach? maybe we can avoid this find here by passing the data as prop

	if (!data) return null;

	return (
		<>
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogTrigger asChild>
					<Button variant="secondary" className="text-white">
						Edit
						<PencilIcon />
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-5xl">
					<DialogHeader>
						<DialogTitle>Edit task</DialogTitle>
						<DialogDescription>
							Here you're editing a task, please be careful while making changes and click "Save Changes"
							to proceed.
						</DialogDescription>
					</DialogHeader>
					<TaskFrom
						onClose={() => setIsOpen(false)}
						defaultValues={data}
						onValid={(values) => {
							try {
								updateTask({
									...values,
									id: data.id,
									taskNo: data.taskNo,
								});
							} catch (error) {
								console.log('error', error);
							} finally {
								setIsOpen(false);
							}
						}}
					/>
					{/* <DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button type="submit">Save changes</Button>
					</DialogFooter> */}
				</DialogContent>
			</Dialog>
		</>
	);
};

export { EditTaskBtn };
