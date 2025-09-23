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
import { InfoIcon, PlusIcon } from 'lucide-react';
import { faker } from '@faker-js/faker';

const NewTaskBtn = () => {
	const { addTask } = useTasks();
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogTrigger asChild>
					<Button>
						Create New
						<PlusIcon />
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-5xl">
					<DialogHeader>
						<DialogTitle>New task</DialogTitle>
						<DialogDescription className="flex items-center gap-2">
							<InfoIcon size={15} />
							Here you're creating a new task, please be careful while filling the information below, make
							sure to select a status!
						</DialogDescription>
					</DialogHeader>
					<TaskFrom
						onClose={() => setIsOpen(false)}
						defaultValues={null}
						onValid={(values) => {
							try {
								addTask({
									...values,
									id: nanoid(),
									taskNo: faker.number.int(),
								});
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

export { NewTaskBtn };
