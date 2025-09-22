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

const formSchema = taskSchema.omit({ id: true });

type FormSchemaT = z.infer<typeof formSchema>;

const TaskFrom = ({ onValid }: { onValid: (values: FormSchemaT) => void }) => {
	const status = useStatusParam();
	const form = useForm<FormSchemaT>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			assignedTo: '',
			category: '',
			notes: '',
			status, // match the current active tab
			title: '',
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
							<FormLabel>Status</FormLabel>
							<FormControl>
								<StatusSelect onValueChange={field.onChange} value={field.value} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input placeholder="Enter title" {...field} />
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

				<FormField
					control={form.control}
					name="notes"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Notes</FormLabel>
							<FormControl>
								<Input placeholder="Enter notes" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
};

export { TaskFrom };
