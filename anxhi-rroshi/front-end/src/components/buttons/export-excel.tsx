'use client';

import { Button } from '@/components/ui/button';
import { FileDownIcon } from 'lucide-react';

const ExportExcelBtn = () => {
	const handleDownload = async () => {
		try {
			const response = await fetch('http://localhost:5000/export-excel');

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
		} catch (error) {
			console.error('Download failed:', error);
		}
	};
	return (
		<Button onClick={handleDownload} size="icon" variant="secondary" className="text-white">
			<FileDownIcon />
		</Button>
	);
};

export { ExportExcelBtn };
