import { Flex } from '@radix-ui/themes';
import { useRecoilValue } from 'recoil';
import { scoreState } from '../atoms/app';
import { CORRECT_POINT_ANIMATE } from '../consts';
import { motion } from 'framer-motion';
import { QuestionItem } from '../interface';

interface QuestionContentProps {
	question: QuestionItem;
	isCorrect?: boolean;
}

const QuestionContent: React.FC<QuestionContentProps> = ({
	question,
	isCorrect,
}) => {
	const score = useRecoilValue(scoreState);

	const renderScoreResult = (): JSX.Element => {
		if (isCorrect === undefined) return <></>;

		return (
			<motion.div
				{...CORRECT_POINT_ANIMATE}
				className={`score ${isCorrect ? 'score-correct' : 'score-wrong'}`}
			>
				{isCorrect ? `+10` : `+0`}
			</motion.div>
		);
	};

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
			{question.content}
			<Flex
				position='absolute'
				className='total-score'
				align='center'
				justify='center'
				direction='column'
				gap='1'
			>
				<p>Score</p>
				{score}
			</Flex>
			{renderScoreResult()}
		</Flex>
	);
};

export default QuestionContent;
