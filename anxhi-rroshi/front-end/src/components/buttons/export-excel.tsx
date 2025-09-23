'use client';

import { Button } from '@/components/ui/button';
import { useStatusParam } from '@/hooks/use-status-param';
import { FileDownIcon } from 'lucide-react';
import { toast } from 'sonner';

const ExportExcelBtn = () => {
	const statusParam = useStatusParam();
	const handleDownload = async () => {
		try {
			const fetchUrl = new URL('http://localhost:5000/export-excel');
			statusParam && fetchUrl.searchParams.append('status', statusParam);

			const response = await fetch(fetchUrl);

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			let filename = 'tasks.xlsx';

			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', filename);
			document.body.appendChild(link);
			link.click();
			link.remove();
			window.URL.revokeObjectURL(url);
			toast.success('Excel exported successfully');
		} catch (error) {
			toast.error('An error happened');
		}
	};
	return (
		<Button onClick={handleDownload} size="icon" variant="secondary" className="text-white">
			<FileDownIcon />
		</Button>
	);
};

export { ExportExcelBtn };
