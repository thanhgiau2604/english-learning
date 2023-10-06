import { Box, Button } from '@radix-ui/themes';
import Settings from '../components/Settings';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { settingState } from '../atoms/app';

const Home = () => {
	const navigate = useNavigate();
	const [setting, setSetting] = useRecoilState(settingState);

	const handleStart = () => {
		setSetting({ ...setting, already: true });
		navigate('/quiz');
	};

	return (
		<Box>
			<Settings />
			<Box
				position='fixed'
				bottom='0'
				height='9'
				width='100%'
				className='home-footer'
			>
				<Button
					color='cyan'
					variant='soft'
					className='button-start'
					onClick={handleStart}
				>
					Start
				</Button>
			</Box>
		</Box>
	);
};

export default Home;
