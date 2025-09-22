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
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { PlusIcon } from 'lucide-react';

const NewTaskBtn = () => {
	const { addTask } = useTasks();
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogTrigger>
					<Button>
						Create new task
						<PlusIcon />
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-3xl">
					<DialogHeader>
						<DialogTitle>New task</DialogTitle>
						<DialogDescription>Create your Task here</DialogDescription>
					</DialogHeader>
					<TaskFrom
						onClose={() => setIsOpen(false)}
						defaultValues={null}
						onValid={(values) => {
							addTask({
								...values,
								id: nanoid(),
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

export { NewTaskBtn };
