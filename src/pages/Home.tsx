import { Box, Container } from '@radix-ui/themes';
import Question from '../components/Question';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentIndexState, questionState } from '../atoms/app';
import { useEffect } from 'react';
import { shuffle } from '../utils';

const Home = () => {
	const [questions, setQuestions] = useRecoilState(questionState);
	const index = useRecoilValue(currentIndexState);

	useEffect(() => {
		setQuestions(shuffle([...questions]));
	}, []);

	return (
		<Box className='center-scr' mt='-7'>
			<Container py='3' px='5' position='relative'>
				<Question data={questions[index]} />
			</Container>
		</Box>
	);
};

export default Home;
