import { Flex, TextField } from '@radix-ui/themes';
import { useFormContext } from 'react-hook-form';

const InputAnswer = () => {
	const { register } = useFormContext();

	return (
		<Flex mx='auto' mt='8' justify='center' align='center' gap='2'>
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
		</Flex>
	);
};

export default InputAnswer;
