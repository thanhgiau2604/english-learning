import { atom } from 'recoil';
import { QuestionList, Setting } from '../interface';

export const scoreState = atom({
	key: 'score',
	default: 0,
});

export const currentIndexState = atom({
	key: 'current_index',
	default: 0,
});

const questionList: QuestionList = [
	{
		content: 'question 1',
		options: ['o1', 'o2', 'o3', '04'],
		key: 'o2',
	},
	{
		content: 'question 2',
		key: '02',
	},
	{
		content: 'question 3',
		options: ['o1', 'o2', 'o3', '04'],
		key: '04',
	},
	{
		content: 'question 4',
		key: '04',
	},
];

export const questionState = atom({
	key: 'question_list',
	default: questionList,
});

export const settingState = atom<Setting>({
	key: 'settings',
	default: {
		timer: undefined,
		already: false,
	},
});
