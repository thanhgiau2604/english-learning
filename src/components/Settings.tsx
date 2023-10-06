import { Box, Strong, Text, TextField, Flex } from '@radix-ui/themes';
import { useRef } from 'react';
import _ from 'lodash';
import { useRecoilState } from 'recoil';
import { settingState } from '../atoms/app';

const Settings = () => {
	const [setting, setSetting] = useRecoilState(settingState);

	const timeout = useRef<NodeJS.Timeout>();

	const handleChangeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (timeout.current) {
			clearTimeout(timeout.current);
		}

		timeout.current = setTimeout(() => {
			setSetting({ ...setting, timer: Number(e.target.value) });
		}, 400);
	};

	return (
		<Box mx='5' mt='4'>
			<Text size='4'>
				<Strong>Settings:</Strong>
			</Text>
			<Box mt='3'>
				<Text size='3'>Time to complete:</Text>
				<Flex gap='3' align='center'>
					<TextField.Root
						mt='3'
						style={{ width: '100%', maxWidth: '300px', paddingRight: '10px' }}
					>
						<TextField.Slot>
							<svg
								width='15'
								height='15'
								viewBox='0 0 15 15'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M7.49998 0.849976C7.22383 0.849976 6.99998 1.07383 6.99998 1.34998V3.52234C6.99998 3.79848 7.22383 4.02234 7.49998 4.02234C7.77612 4.02234 7.99998 3.79848 7.99998 3.52234V1.8718C10.8862 2.12488 13.15 4.54806 13.15 7.49998C13.15 10.6204 10.6204 13.15 7.49998 13.15C4.37957 13.15 1.84998 10.6204 1.84998 7.49998C1.84998 6.10612 2.35407 4.83128 3.19049 3.8459C3.36919 3.63538 3.34339 3.31985 3.13286 3.14115C2.92234 2.96245 2.60681 2.98825 2.42811 3.19877C1.44405 4.35808 0.849976 5.86029 0.849976 7.49998C0.849976 11.1727 3.82728 14.15 7.49998 14.15C11.1727 14.15 14.15 11.1727 14.15 7.49998C14.15 3.82728 11.1727 0.849976 7.49998 0.849976ZM6.74049 8.08072L4.22363 4.57237C4.15231 4.47295 4.16346 4.33652 4.24998 4.25C4.33649 4.16348 4.47293 4.15233 4.57234 4.22365L8.08069 6.74051C8.56227 7.08599 8.61906 7.78091 8.19998 8.2C7.78089 8.61909 7.08597 8.56229 6.74049 8.08072Z'
									fill='currentColor'
									fillRule='evenodd'
									clipRule='evenodd'
								></path>
							</svg>
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
		</Box>
	);
};

export default Settings;
