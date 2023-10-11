export interface QuestionItem {
	id: string;
	content: string;
	options?: string[];
	key: string;
	category: string;
	explanation?: string;
	example?: string;
	pronounciation?: string;
	part_of_speech?: string;
}

export type QuestionList = QuestionItem[];

export interface Setting {
	already: boolean;
	timer?: number;
	selectedCategory?: string;
	questionNum?: number;
	autoplay: boolean;
}

export interface CategoryItem {
	title: string;
}

export interface CSVRow {
	id: string;
	question: string;
	key: string;
	category: string;
	option1?: string;
	option2?: string;
	option3?: string;
	explanation?: string;
	example?: string;
	pronounciation?: string;
	part_of_speech?: string;
}
