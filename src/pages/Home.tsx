import { Box, Container } from '@radix-ui/themes';
import Question from '../components/Question';

const Home = () => {
	return (
		<Box className='center-scr' mt='-7'>
			<Container py='3' px='5' position='relative'>
				<Question type='quiz' />
			</Container>
		</Box>
	);
};

export default Home;
