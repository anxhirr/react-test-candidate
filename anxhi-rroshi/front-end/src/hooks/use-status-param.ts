import { useSearchParams } from 'next/navigation';

const useStatusParam = () => {
	const searchParams = useSearchParams();
	const statusParam = searchParams.get('status') as TaskT['status'] | null;

	return statusParam;
};

export { useStatusParam };
