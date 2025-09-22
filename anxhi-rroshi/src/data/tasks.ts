import { faker } from '@faker-js/faker';
import { nanoid } from 'nanoid';

const range = (len: number) => {
	const arr: number[] = [];
	for (let i = 0; i < len; i++) {
		arr.push(i);
	}
	return arr;
};

const newTask = (): TaskT => {
	return {
		assignedTo: faker.person.fullName(),
		status: faker.helpers.shuffle<TaskT['status']>(['CACELLED', 'COMPLETED', 'IN_PROGRESS', 'NEW', 'ON_HOLD'])[0]!,
		id: faker.string.uuid(),
		title: `title ${nanoid()}`,
		category: `category ${nanoid()}`,
		notes: `notes ${nanoid()}`,
	};
};

function makeTaskData(...lens: number[]) {
	const makeDataLevel = (depth = 0): TaskT[] => {
		const len = lens[depth]!;
		return range(len).map((_d): TaskT => {
			return newTask();
		});
	};

	return makeDataLevel();
}

export { makeTaskData };
