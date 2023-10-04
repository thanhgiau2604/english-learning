import { Box } from '@radix-ui/themes';
import QuestionContent from './QuestionContent';
import Options from '../containers/Options';
import InputAnswer from './InputAnswer';
import SubmitButton from './SubmitButton';
import {
	Form,
	FormProvider,
	FormSubmitHandler,
	useForm,
} from 'react-hook-form';
import { QuestionItem } from '../interface';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentIndexState, questionState, scoreState } from '../atoms/app';
import { useState } from 'react';

interface QuestionProps {
	data: QuestionItem;
}

export interface FormValues {
	selected: string;
	answer: string;
}

const Question: React.FC<QuestionProps> = ({ data }) => {
	const [index, setIndex] = useRecoilState(currentIndexState);
	const [totalScore, setTotalScore] = useRecoilState(scoreState);
	const [isCorrect, setCorrect] = useState<boolean>();

	const questions = useRecoilValue(questionState);
	const method = useForm<FormValues>();

	const onSubmit: FormSubmitHandler<FormValues> = submit => {
		console.log(submit.data);
		const answer = submit.data.selected || submit.data.answer;
		const isCorrect = answer.trim() === data.key;
		setCorrect(isCorrect);

		setTimeout(() => {
			setTotalScore(isCorrect ? totalScore + 10 : totalScore);
		}, 500);

		setTimeout(() => {
			if (index < questions.length - 1) setIndex(index + 1);
			else alert('Done');
			method.reset();
			setCorrect(undefined);
		}, 1000);
	};

	const questionType = data.options?.length ? 'quiz' : 'text';

	return (
		<FormProvider {...method}>
			<Form onSubmit={onSubmit}>
				<Box>
					<QuestionContent question={data} isCorrect={isCorrect} />
					{questionType === 'quiz' ? (
						<>
							<Options values={data.options} questionKey={data.key} />
							<Box style={{ textAlign: 'center' }} mt='4'>
								<SubmitButton />
							</Box>
						</>
					) : (
						<InputAnswer />
					)}
				</Box>
			</Form>
		</FormProvider>
	);
};

export default Question;
