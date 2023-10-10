import { Box, Container } from '@radix-ui/themes';
import Question from '../components/Question';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
	currentIndexState,
	questionState,
	rawDataState,
	settingState,
} from '../atoms/app';
import { useEffect, useState } from 'react';
import { buildQuestionData, shuffle } from '../utils';
import Timer from '../components/Timer';
import { useNavigate } from 'react-router-dom';
import { QuestionItem } from '../interface';

const QuizPage = () => {
	const [questions, setQuestions] = useState<QuestionItem[]>([]);
	const index = useRecoilValue(currentIndexState);
	const { timer } = useRecoilValue(settingState);
	const [seconds, setSeconds] = useState<number>();
	const rawData = useRecoilValue(rawDataState);
	const { selectedCategory } = useRecoilValue(settingState);
	const navigate = useNavigate();

	useEffect(() => {
		if (!selectedCategory) {
			navigate('/');
			return;
		}
		const questions = buildQuestionData(rawData, selectedCategory);
		setQuestions(shuffle([...questions]));
	}, [selectedCategory]);

	useEffect(() => {
		if (!timer) return;
		let seconds = timer * 60;
		const timeout = setInterval(() => {
			if (seconds === 0) {
				clearInterval(timeout);
				navigate('/complete');
			}
			seconds -= 1;
			setSeconds(seconds);
		}, 1000);
		return () => clearInterval(timeout);
	}, [timer]);

	return (
		<Box className='center-scr'>
			<Container py='3' px='5' position='relative'>
				<Timer seconds={seconds} />
				<Question data={questions[index]} questionNum={questions.length} />
			</Container>
		</Box>
	);
};

export default QuizPage;
