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
				<DialogTrigger>
					<Button variant="secondary" className="text-white">
						Edit
						<PencilIcon />
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>New task</DialogTitle>
						<DialogDescription>Create your Task here</DialogDescription>
					</DialogHeader>
					<TaskFrom
						onClose={() => setIsOpen(false)}
						defaultValues={data}
						onValid={(values) => {
							updateTask({
								...values,
								id: data?.id,
							});
							setIsOpen(false);
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
