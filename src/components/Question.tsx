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
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentIndexState, scoreState, settingState } from '../atoms/app';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionMoreInfo from './MoreInfo';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { wait } from '../utils';
import NextButton from './NextButton';
import { APP_ROUTES } from '../consts';

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
	const { autoplay, multichoice } = useRecoilValue(settingState);
	const [isCorrect, setCorrect] = useState<boolean>();

	const method = useForm<FormValues>({ resolver });

	const resetQuestion = () => {
		setCorrect(undefined);
		method.reset();
	};

	const nextQuestion = async () => {
		resetQuestion();
		await wait(300);
		if (index < questionNum - 1) setIndex(index + 1);
		else {
			navigate(APP_ROUTES.complete);
		}
	};

	const onSubmit: FormSubmitHandler<FormValues> = async submit => {
		const answer = submit.data.selected || submit.data.answer;
		const isCorrect = answer.trim() === data.key;
		setCorrect(isCorrect);

		await wait(500);
		setTotalScore(isCorrect ? totalScore + 10 : totalScore);

		if (autoplay) {
			await wait(400);
			resetQuestion();
			await wait(300);
			nextQuestion();
		}
	};

	const isSubmitted = isCorrect !== undefined || method.formState.isSubmitting;
	const questionType = data?.options?.length && multichoice ? 'quiz' : 'text';

	return (
		<AnimatePresence>
			<LayoutGroup>
				<motion.div layout='position' exit={{ opacity: 0 }}>
					<FormProvider {...method}>
						<Form onSubmit={onSubmit}>
							<Box>
								<QuestionContent question={data} isCorrect={isCorrect} />
								{questionType === 'quiz' ? (
									<Options
										values={data.options}
										questionKey={data.key}
										isCorrect={isCorrect}
									/>
								) : (
									<InputAnswer />
								)}
								<Box style={{ textAlign: 'center' }} mt='4'>
									<SubmitButton isSubmitted={isSubmitted} />
									{!autoplay && <NextButton handleClick={nextQuestion} />}
								</Box>
							</Box>
						</Form>
					</FormProvider>
				</motion.div>
				<motion.div layout='position'>
					<QuestionMoreInfo
						isDisplay={isCorrect}
						questionData={data}
						questionType={questionType}
					/>
				</motion.div>
			</LayoutGroup>
		</AnimatePresence>
	);
};

export default Question;
