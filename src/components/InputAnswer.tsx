import { Box, Flex, Text, TextField } from '@radix-ui/themes';
import { useFormContext } from 'react-hook-form';
import ShowOptionButton from './buttons/ShowOptionButton';
import { useRecoilState } from 'recoil';
import { showOptions } from '../atoms/app';

interface Props {
	isSubmitted: boolean;
}

const InputAnswer = ({ isSubmitted }: Props) => {
	const { register } = useFormContext();
	const [, setShowOptions] = useRecoilState(showOptions);

	const handleShowOptions = () => {
		setShowOptions(true);
	};

	return (
		<Flex
			mx='auto'
			mt='8'
			justify='center'
			align='center'
			gap='2'
			direction='column'
		>
			<TextField.Root style={{ width: '100%', maxWidth: '600px' }}>
				<TextField.Input
					autoFocus
					size='3'
					placeholder='Enter you answer'
					radius='large'
					style={{ height: '80px' }}
					{...register('answer')}
				/>
			</TextField.Root>
			<Box mt='3'>
				<Flex gap='3' align='center'>
					<Text as='p'>You don't have answer</Text>
					<ShowOptionButton
						isSubmitted={isSubmitted}
						handleClick={handleShowOptions}
					/>
				</Flex>
			</Box>
		</Flex>
	);
};

export default InputAnswer;
