import { faker } from '@faker-js/faker';

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
		title: `title ${faker.number.int()}`,
		category: `category ${faker.number.int()}`,
		notes: `notes ${faker.number.int()}`,
		taskNo: faker.number.int(),
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
