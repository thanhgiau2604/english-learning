import { Flex, TextField } from '@radix-ui/themes';
import SubmitButton from './SubmitButton';
import { useFormContext } from 'react-hook-form';

const InputAnswer = () => {
	const { register } = useFormContext();

	return (
		<Flex mx='auto' mt='8' justify='center' align='center' gap='2'>
			<TextField.Input
				size='3'
				placeholder='Enter you answer'
				radius='large'
				style={{ height: '80px', width: '600px' }}
				{...register('answer')}
			/>
			<SubmitButton />
		</Flex>
	);
};

export default InputAnswer;
