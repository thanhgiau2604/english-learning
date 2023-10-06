export interface QuestionItem {
	content: string;
	options?: string[];
	key: string;
}

export type QuestionList = QuestionItem[];

export interface Setting {
	timer?: number;
	already: boolean;
}
