import { Box, Button, Container } from '@radix-ui/themes';
import Question from '../components/Question';
import { useRecoilValue } from 'recoil';
import { currentIndexState, rawDataState, settingState } from '../atoms/app';
import { useEffect, useState } from 'react';
import { buildQuestionData, shuffle } from '../utils';
import Timer from '../components/Timer';
import { useNavigate } from 'react-router-dom';
import { QuestionItem } from '../interface';
import { APP_ROUTES } from '../consts';

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
			<Container py='3' px='5' position='relative'>
				<Timer seconds={seconds} />
				<Question data={questions[index]} questionNum={questions.length} />
				<Box style={{ textAlign: 'center' }} mt='4' width='100%'>
					<Button
						variant='soft'
						color='red'
						onClick={() => navigate(APP_ROUTES.complete)}
					>
						<svg
							width='15'
							height='15'
							viewBox='0 0 15 15'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M3 1C2.44771 1 2 1.44772 2 2V13C2 13.5523 2.44772 14 3 14H10.5C10.7761 14 11 13.7761 11 13.5C11 13.2239 10.7761 13 10.5 13H3V2L10.5 2C10.7761 2 11 1.77614 11 1.5C11 1.22386 10.7761 1 10.5 1H3ZM12.6036 4.89645C12.4083 4.70118 12.0917 4.70118 11.8964 4.89645C11.7012 5.09171 11.7012 5.40829 11.8964 5.60355L13.2929 7H6.5C6.22386 7 6 7.22386 6 7.5C6 7.77614 6.22386 8 6.5 8H13.2929L11.8964 9.39645C11.7012 9.59171 11.7012 9.90829 11.8964 10.1036C12.0917 10.2988 12.4083 10.2988 12.6036 10.1036L14.8536 7.85355C15.0488 7.65829 15.0488 7.34171 14.8536 7.14645L12.6036 4.89645Z'
								fill='currentColor'
								fillRule='evenodd'
								clipRule='evenodd'
							></path>
						</svg>
						Quit
					</Button>
				</Box>
			</Container>
		</Box>
	);
};

export default QuizPage;
