'use client';

import { userSchema } from '@/schema/taks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const formSchema = userSchema.omit({ id: true });

type FormSchemaT = z.infer<typeof formSchema>;

type Props = {
	onValid: (values: FormSchemaT) => void;
};

const LoginFrom = ({ onValid }: Props) => {
	const router = useRouter();
	const form = useForm<FormSchemaT>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			password: '',
			username: '',
		},
	});

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(
					async (values) => {
						try {
							await onValid(values);
							router.refresh();
						} catch (error) {
							toast.error('An error happened');
						}
					},
					(error) => {
						toast.error('An error happened');
					}
				)}
				className="space-y-8 min-w-md"
			>
				<Card>
					<CardHeader>
						<CardTitle>Login to your account</CardTitle>
						<CardDescription>Enter your details below to login to your account</CardDescription>
					</CardHeader>
					<CardContent>
						<div>
							<div className="flex flex-col gap-6">
								<FormField
									control={form.control}
									name="username"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Username</FormLabel>
											<FormControl>
												<Input placeholder="Enter username..." {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<div className="grid gap-3">
									<FormField
										control={form.control}
										name="password"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Password</FormLabel>
												<FormControl>
													<Input placeholder="Enter password..." {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="flex flex-col gap-3">
									<Button type="submit" className="w-full">
										Login
									</Button>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</form>
		</Form>
	);
};

export { LoginFrom };
