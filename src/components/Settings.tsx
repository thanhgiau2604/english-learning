import { Box, Strong, Text, TextField, Flex, Switch } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { settingState } from '../atoms/app';
import { ReactComponent as AlarmIcon } from '../assets/images/alarm.svg';
import { useDebounce } from '../hooks';
import { motion } from 'framer-motion';

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

	const handleChangeAutoplay = (isChecked: boolean) => {
		setSetting({ ...setting, autoplay: isChecked });
	};

	const handleChangeMultiChoice = (isOn: boolean) => {
		setSetting({ ...setting, multichoice: isOn });
	};

	const handleSwitchToExplanation = (isOn: boolean) => {
		setSetting({ ...setting, useExplanation: isOn });
	};

	useEffect(() => {
		setSetting({ ...setting, timer: timerValue });
	}, [timerValue]);

	useEffect(() => {
		setSetting({ ...setting, questionNum: qNumValue });
	}, [qNumValue]);

	return (
		<motion.div className='settings' layout='position'>
			<Text size='4'>
				<Strong>Settings:</Strong>
			</Text>
			<Box className='setting-main'>
				<Box className='time-complete' mt='4'>
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
				<Box className='autoplay' mt='4'>
					<Text as='div' size='2'>
						<Flex gap='2'>
							<Switch radius='full' onCheckedChange={handleChangeAutoplay} />
							Autoplay
						</Flex>
					</Text>
				</Box>
				<Box className='multichoice' mt='4'>
					<Text as='div' size='2'>
						<Flex gap='2'>
							<Switch
								radius='full'
								onCheckedChange={handleChangeMultiChoice}
								defaultChecked
							/>
							Multichoice
						</Flex>
					</Text>
				</Box>
				<Box className='use-explanation' mt='4'>
					<Text as='div' size='2'>
						<Flex gap='2'>
							<Switch
								radius='full'
								onCheckedChange={handleSwitchToExplanation}
							/>
							use exaplanation to make question
						</Flex>
					</Text>
				</Box>
			</Box>
		</motion.div>
	);
};

export default Settings;
