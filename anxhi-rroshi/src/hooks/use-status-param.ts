import { useSearchParams } from 'next/navigation';

const useStatusParam = (): TaskT['status'] => {
	const searchParams = useSearchParams();
	const statusParam = searchParams.get('status') as TaskT['status'] | null;

	return statusParam || 'NEW';
};

export { useStatusParam };
