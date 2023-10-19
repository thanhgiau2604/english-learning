import _ from 'lodash';
import {
	CSVRow,
	CategoryItem,
	QuestionItem,
	QuestionType,
	Setting,
} from './interface';

// common
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

export const wait = (ms: number) => new Promise(res => setTimeout(res, ms));

export const convertTimeStr = (time: number): string => {
	const seconds = time % 60 < 10 ? `0${time % 60}` : `${time % 60}`;
	const truncMinutes = Math.trunc(time / 60);
	const minutes = truncMinutes < 10 ? `0${truncMinutes}` : `${truncMinutes}`;
	return `${minutes}:${seconds}`;
};

// specific
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

export const getQuestionType = (
	question: QuestionItem,
	setting: Setting
): QuestionType => {
	if (setting.multichoice) {
		return setting.useExplanation && question?.explanation
			? 'quiz_reverse'
			: 'quiz';
	}
	return setting.useExplanation && question?.explanation
		? 'input_reverse'
		: 'input';
};

const randomOptions = (
	rows: CSVRow[],
	questionType: QuestionType
): string[] => {
	const random = _.sampleSize(rows, 3);

	if (questionType === 'quiz') {
		return random.map(i => i.key);
	}

	return random.map(i => i.question);
};

export const buildQuestionData = (
	CSVRows: CSVRow[],
	category: string
): QuestionItem[] => {
	const rows = (CSVRows || []).filter(r => r.category === category);
	return rows.map(({ question, ...rest }) => {
		return {
			...rest,
			content: question,
			options: [],
		};
	});
};

export const getFullQuestionData = (
	rows: CSVRow[],
	question: QuestionItem,
	questionType: QuestionType
): QuestionItem => {
	let options = randomOptions(rows, questionType);
	const key = questionType === 'quiz' ? question?.key : question?.content;
	options = randomKeyInOptions(key, options);
	return { ...question, options };
};

export const checkAnswer = (
	answer: string,
	question: QuestionItem,
	questionType: QuestionType
): boolean => {
	if (questionType === 'quiz' || questionType === 'input') {
		return answer === question.key;
	}

	return answer === question.content;
};

export const quizType = (type: QuestionType) =>
	type === 'quiz' || type === 'quiz_reverse';

export const inputType = (type: QuestionType) =>
	type === 'input' || type === 'input_reverse';
