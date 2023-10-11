import { Box, Button, Strong, Text } from '@radix-ui/themes';
import { useRecoilValue } from 'recoil';
import { scoreState, settingState } from '../atoms/app';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { APP_ROUTES } from '../consts';

const CompletePage = () => {
	const score = useRecoilValue(scoreState);
	const { already } = useRecoilValue(settingState);
	const navigate = useNavigate();

	useEffect(() => {
		if (!already) {
			navigate(APP_ROUTES.home);
		}
	}, []);

	return (
		<Box mt='4' style={{ textAlign: 'center' }}>
			<Text size='5' as='p'>
				<Strong>Congratulation !!</Strong>
			</Text>
			<Text size='3' mt='2' as='p'>
				Your scrore is: <Strong>{score}</Strong>
			</Text>
			<Button variant='soft' color='brown' mt='4' onClick={() => navigate('/')}>
				Back to Home
			</Button>
		</Box>
	);
};

export default CompletePage;
