import { title } from 'process';
import z from 'zod';

const taskSchema = z.object({
	id: z.uuid(),
	title: z.string().min(1),
	category: z.string().min(1),
	assignedTo: z.string().min(1),
	notes: z.string(),
	status: z.enum(['NEW', 'IN_PROGRESS', 'ON_HOLD', 'CACELLED', 'COMPLETED']),
});

export { taskSchema };
