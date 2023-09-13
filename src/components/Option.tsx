import { Flex } from '@radix-ui/themes';

interface OptionProps {
	value: string;
	isCorrect?: boolean;
}

const Option: React.FC<OptionProps> = ({ value = '', isCorrect }) => {
	return (
		<Flex align='center' justify='center' className='option-item'>
			{value}
		</Flex>
	);
};

export default Option;
