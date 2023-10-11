import { Box } from '@radix-ui/themes';
import QuestionContent from './QuestionContent';
import Options from '../containers/Options';
import InputAnswer from './InputAnswer';
import SubmitButton from './SubmitButton';
import {
	Form,
	FormProvider,
	FormSubmitHandler,
	Resolver,
	useForm,
} from 'react-hook-form';
import { QuestionItem } from '../interface';
import { useRecoilState } from 'recoil';
import { currentIndexState, scoreState } from '../atoms/app';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../consts';
import { wait } from '@testing-library/user-event/dist/utils';

interface QuestionProps {
	data: QuestionItem;
	questionNum: number;
}

export interface FormValues {
	selected: string;
	answer: string;
}

const resolver: Resolver<FormValues> = async values => {
	return {
		values,
		errors:
			!values.answer && !values.selected
				? {
						answer: {
							type: 'required',
							message: 'This is required.',
						},
				  }
				: {},
	};
};

const Question: React.FC<QuestionProps> = ({ data, questionNum }) => {
	const navigate = useNavigate();
	const [index, setIndex] = useRecoilState(currentIndexState);
	const [totalScore, setTotalScore] = useRecoilState(scoreState);
	const [isCorrect, setCorrect] = useState<boolean>();

	const method = useForm<FormValues>({ resolver });

	const onSubmit: FormSubmitHandler<FormValues> = async submit => {
		const answer = submit.data.selected || submit.data.answer;
		const isCorrect = answer.trim() === data.key;
		setCorrect(isCorrect);

		await wait(500);
		setTotalScore(isCorrect ? totalScore + 10 : totalScore);

		await wait(500);
		if (index < questionNum - 1) setIndex(index + 1);
		else {
			navigate(APP_ROUTES.complete);
		}
		method.reset();
		setCorrect(undefined);
	};

	const questionType = data?.options?.length ? 'quiz' : 'text';

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
