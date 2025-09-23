import { useSearchParams } from 'next/navigation';

const useSearchParam = () => {
	const searchParams = useSearchParams();
	const searchParam = searchParams.get('search') as string | null;

	return searchParam;
};

export { useSearchParam };
