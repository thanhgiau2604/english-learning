import { Box, Container } from '@radix-ui/themes';
import Question from '../components/Question';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentIndexState, questionState, settingState } from '../atoms/app';
import { useCallback, useEffect, useState } from 'react';
import { shuffle } from '../utils';
import Timer from '../components/Timer';
import { useNavigate } from 'react-router-dom';

const QuizPage = () => {
	const [questions, setQuestions] = useRecoilState(questionState);
	const index = useRecoilValue(currentIndexState);
	const { timer } = useRecoilValue(settingState);
	const [seconds, setSeconds] = useState<number>();
	const navigate = useNavigate();

	useEffect(() => {
		setQuestions(shuffle([...questions]));
	}, []);

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
				<Question data={questions[index]} />
			</Container>
		</Box>
	);
};

export default QuizPage;
