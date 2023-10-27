import { Box } from '@radix-ui/themes';
import Question from '../components/Question';
import { useRecoilValue } from 'recoil';
import { currentIndexState, rawDataState, settingState } from '../atoms/app';
import { useEffect, useState } from 'react';
import {
	buildQuestionData,
	getFullQuestionData,
	getQuestionType,
	shuffle,
} from '../utils';
import Timer from '../components/Timer';
import { useNavigate } from 'react-router-dom';
import { QuestionItem } from '../interface';
import { APP_ROUTES } from '../consts';
import QuitButton from '../components/buttons/QuitButton';
import { useTimer } from '../hooks/useTimer';

const QuizPage = () => {
	const [questions, setQuestions] = useState<QuestionItem[]>([]);
	const index = useRecoilValue(currentIndexState);
	const { timer, questionNum } = useRecoilValue(settingState);
	const rawData = useRecoilValue(rawDataState);
	const setting = useRecoilValue(settingState);
	const navigate = useNavigate();
	const { seconds } = useTimer(timer);
	const { selectedCategory } = setting;

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

	const questionType = getQuestionType(questions[index], setting);
	const questionData = getFullQuestionData(
		rawData,
		questions[index],
		questionType
	);

	return (
		<Box className='center-scr'>
			<Box py='5' px='5' position='relative' className='quiz-container'>
				<Timer seconds={seconds} />
				<Question data={questionData} questionNum={questions.length} />
				<QuitButton />
			</Box>
		</Box>
	);
};

export default QuizPage;
