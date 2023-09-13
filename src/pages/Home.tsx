import { Box, Container } from '@radix-ui/themes';
import Question from '../components/Question';
import Options from '../containers/Options';

const Home = () => {
	return (
		<Box className='center-scr' mt='-7'>
			<Container py='3' px='5'>
				<Question value='Question content' />
				<Options values={['aa', 'bb', 'cc', 'dd']} questionKey='cc' />
			</Container>
		</Box>
	);
};

export default Home;
