import { atom } from 'recoil';
import { CSVRow, CategoryItem, QuestionList, Setting } from '../interface';

export const scoreState = atom({
	key: 'score',
	default: 0,
});

export const currentIndexState = atom({
	key: 'current_index',
	default: 0,
});

const questionList: QuestionList = [];

export const questionState = atom({
	key: 'question_list',
	default: questionList,
});

export const categoryState = atom<CategoryItem[]>({
	key: 'category',
	default: [],
});

export const rawDataState = atom<CSVRow[]>({
	key: 'raw_data',
	default: [],
});

export const settingState = atom<Setting>({
	key: 'settings',
	default: {
		timer: undefined,
		already: false,
		selectedCategory: undefined,
	},
});
