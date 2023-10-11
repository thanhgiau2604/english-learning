import { Box, Strong, Text, TextField, Flex } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { settingState } from '../atoms/app';
import { ReactComponent as AlarmIcon } from '../assets/images/alarm.svg';
import { useDebounce } from '../hooks';

const Settings = () => {
	const [setting, setSetting] = useRecoilState(settingState);
	const [timer, setTimer] = useState<number>();
	const [qNum, setQNum] = useState<number>();
	const timerValue = useDebounce<number>(timer, 400);
	const qNumValue = useDebounce<number>(qNum, 400);

	const handleChangeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTimer(Number(e.target.value));
	};

	const handleChangeQNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQNum(Number(e.target.value));
	};

	useEffect(() => {
		setSetting({ ...setting, timer: timerValue });
	}, [timerValue]);

	useEffect(() => {
		setSetting({ ...setting, questionNum: qNumValue });
	}, [qNumValue]);

	return (
		<Box px='5' pt='4'>
			<Text size='4'>
				<Strong>Settings:</Strong>
			</Text>
			<Box mt='3'>
				<Box className='time-complete'>
					<Text size='3'>Time to complete (empty = unlimited):</Text>
					<Flex gap='3' align='center'>
						<TextField.Root
							mt='3'
							style={{ width: '100%', maxWidth: '300px', paddingRight: '10px' }}
						>
							<TextField.Slot>
								<AlarmIcon />
							</TextField.Slot>
							<TextField.Input
								size='3'
								radius='large'
								type='number'
								onChange={handleChangeTime}
							/>
						</TextField.Root>
						<span>minutes</span>
					</Flex>
				</Box>
				<Box className='question-number' mt='4'>
					<Text size='3'>Number of questions (empty = all):</Text>
					<Flex gap='3' align='center'>
						<TextField.Root
							mt='3'
							style={{ width: '100%', maxWidth: '300px', paddingRight: '10px' }}
						>
							<TextField.Input
								size='3'
								radius='large'
								type='number'
								onChange={handleChangeQNumber}
							/>
						</TextField.Root>
						<span>questions</span>
					</Flex>
				</Box>
			</Box>
		</Box>
	);
};

export default Settings;
