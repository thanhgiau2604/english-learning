import { Box, Container } from '@radix-ui/themes';
import Question from '../components/Question';
import { useRecoilValue } from 'recoil';
import { currentIndexState, rawDataState, settingState } from '../atoms/app';
import { useEffect, useState } from 'react';
import { buildQuestionData, shuffle } from '../utils';
import Timer from '../components/Timer';
import { useNavigate } from 'react-router-dom';
import { QuestionItem } from '../interface';
import { APP_ROUTES } from '../consts';
import QuitButton from '../components/QuitButton';

const QuizPage = () => {
	const [questions, setQuestions] = useState<QuestionItem[]>([]);
	const index = useRecoilValue(currentIndexState);
	const { timer, questionNum } = useRecoilValue(settingState);
	const [seconds, setSeconds] = useState<number>();
	const rawData = useRecoilValue(rawDataState);
	const { selectedCategory } = useRecoilValue(settingState);
	const navigate = useNavigate();

	useEffect(() => {
		if (!selectedCategory) {
			navigate(APP_ROUTES.home);
			return;
		}
		const questions = buildQuestionData(rawData, selectedCategory);

		if (!questions.length) {
			navigate(APP_ROUTES.home);
			return;
		}

		const questionWithNum = shuffle([...questions]).slice(0, questionNum);

		setQuestions(questionWithNum);
	}, [selectedCategory, questionNum]);

	useEffect(() => {
		if (!timer) return;
		let seconds = timer * 60;
		const timeout = setInterval(() => {
			if (seconds === 0) {
				clearInterval(timeout);
				navigate(APP_ROUTES.complete);
			}
			seconds -= 1;
			setSeconds(seconds);
		}, 1000);
		return () => clearInterval(timeout);
	}, [timer]);

	return (
		<Box className='center-scr'>
			<Box py='5' px='5' position='relative' className='quiz-container'>
				<Timer seconds={seconds} />
				<Question data={questions[index]} questionNum={questions.length} />
				<QuitButton />
			</Box>
		</Box>
	);
};

export default QuizPage;
