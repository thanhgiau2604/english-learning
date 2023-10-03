import { Flex } from '@radix-ui/themes';
import { useRecoilValue } from 'recoil';
import { scoreState } from '../atoms/app';

interface QuestionContentProps {
	value: string;
}

const QuestionContent: React.FC<QuestionContentProps> = ({ value }) => {
	const score = useRecoilValue(scoreState);

	return (
		<Flex
			py='2'
			px='3'
			mx='auto'
			align='center'
			justify='center'
			className='question'
			position='relative'
		>
			{value}
			<Flex
				position='absolute'
				className='score'
				align='center'
				justify='center'
				direction='column'
				gap='1'
			>
				<p>Score</p>
				{score}
			</Flex>
		</Flex>
	);
};

export default QuestionContent;
