import { Flex } from '@radix-ui/themes';

interface QuestionProps {
	value: string;
}

const Question: React.FC<QuestionProps> = ({ value }) => {
	return (
		<Flex
			py='2'
			px='3'
			mx='auto'
			align='center'
			justify='center'
			className='question'
		>
			{value}
		</Flex>
	);
};

export default Question;
