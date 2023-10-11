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

	let moreInfo = question?.part_of_speech
		? `(${question?.part_of_speech})`
		: '';
	moreInfo += question?.pronounciation || '';

	return (
		<Flex gap='4' align='center' justify='center' py='2' px='3'>
			<Flex align='center' justify='center' className='question'>
				{`${question?.content} ${moreInfo}`}
			</Flex>
			<Flex
				className='total-score'
				align='center'
				justify='center'
				direction='column'
				gap='1'
				position='relative'
			>
				<p>Score</p>
				<p>{score}</p>
				{renderScoreResult()}
			</Flex>
		</Flex>
	);
};

export default QuestionContent;
