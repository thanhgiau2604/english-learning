import { title } from 'process';
import { CSVRow, CategoryItem, QuestionItem } from './interface';

export function shuffle<T>(array: Array<T>): Array<T> {
	let currentIndex = array.length,
		randomIndex;

	// While there remain elements to shuffle.
	while (currentIndex > 0) {
		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		];
	}

	return array;
}

export const convertTimeStr = (time: number): string => {
	const seconds = time % 60 < 10 ? `0${time % 60}` : `${time % 60}`;
	const truncMinutes = Math.trunc(time / 60);
	const minutes = truncMinutes < 10 ? `0${truncMinutes}` : `${truncMinutes}`;
	return `${minutes}:${seconds}`;
};

export const buildCategory = (data: CSVRow): CategoryItem[] => {
	if (!data || !data?.category) return [];
	return data.category.split(',')?.map(c => ({
		title: c.trim(),
	}));
};

const randomKeyInOptions = (key: string, options: string[]): string[] => {
	if (options.length) {
		const index = Math.floor(Math.random() * 4);
		options.splice(index, 0, key);
	}
	return options;
};

export const buildQuestionData = (
	CSVRows: CSVRow[],
	category: string
): QuestionItem[] => {
	return (CSVRows || [])
		.filter(r => r.category === category)
		.map(({ question, option1, option2, option3, ...rest }) => {
			let options: string[] = [];
			if (option1) options.push(option1);
			if (option2) options.push(option2);
			if (option3) options.push(option3);

			options = randomKeyInOptions(rest.key, options);
			return {
				...rest,
				content: question,
				options,
			};
		});
};

export const wait = (ms: number) => new Promise(res => setTimeout(res, ms));
