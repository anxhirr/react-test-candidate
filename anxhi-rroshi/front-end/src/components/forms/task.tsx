'use client';

import { useStatusParam } from '@/hooks/use-status-param';
import { taskSchema } from '@/schema/taks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AssignToSelect, CategorySelect, StatusSelect } from '../selects';
import 'react-quill-new/dist/quill.snow.css';
import { CheckIcon, XIcon } from 'lucide-react';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

const formSchema = taskSchema.omit({ id: true });

type FormSchemaT = z.infer<typeof formSchema>;

type Props = {
	onClose: () => void;
	defaultValues: Partial<FormSchemaT> | null;
	onValid: (values: FormSchemaT) => void;
};

const TaskFrom = ({ onClose, defaultValues, onValid }: Props) => {
	const status = useStatusParam();
	const form = useForm<FormSchemaT>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			assignedTo: '',
			category: '',
			notes: '',
			status: status || 'NEW', // match the current active tab
			title: '',
			...defaultValues,
		},
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onValid)} className="space-y-8">
				<FormField
					control={form.control}
					name="status"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<StatusSelect onValueChange={field.onChange} value={field.value} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="grid grid-cols-3 gap-3">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Task Title</FormLabel>
								<FormControl>
									<Input placeholder="Enter name..." {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="category"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Category</FormLabel>
								<FormControl>
									<CategorySelect onValueChange={field.onChange} value={field.value} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="assignedTo"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Assign To</FormLabel>
								<FormControl>
									<AssignToSelect onValueChange={field.onChange} value={field.value} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name="notes"
					render={({ field }) => (
						<FormItem className="mb-16">
							<FormLabel>Notes</FormLabel>
							<FormControl>
								<ReactQuill
									theme="snow"
									value={field.value}
									onChange={field.onChange}
									placeholder="You can leave a note here"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex justify-between">
					<Button type="button" variant="destructive" onClick={() => onClose()}>
						Close & Don't Save
						<XIcon />
					</Button>

					<Button type="submit">
						Save Changes
						<CheckIcon />
					</Button>
				</div>
			</form>
		</Form>
	);
};

export { TaskFrom };
