import { Em, Flex } from '@radix-ui/themes';
import { useRecoilValue } from 'recoil';
import { scoreState, settingState } from '../atoms/app';
import { CORRECT_POINT_ANIMATE } from '../consts';
import { motion } from 'framer-motion';
import { QuestionItem } from '../interface';
import React from 'react';

interface QuestionContentProps {
	question: QuestionItem;
	isCorrect?: boolean;
}

const QuestionContent: React.FC<QuestionContentProps> = ({
	question,
	isCorrect,
}) => {
	const score = useRecoilValue(scoreState);
	const { useExplanation } = useRecoilValue(settingState);

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

	const renderContent = (): JSX.Element => {
		if (useExplanation && question?.explanation) {
			return (
				<React.Fragment>
					{`${question.explanation} `}
					{question?.part_of_speech && <Em>({question?.part_of_speech})</Em>}
				</React.Fragment>
			);
		}

		return (
			<React.Fragment>
				<p className='break-line'>{`${question?.content} `}</p>
				{question?.part_of_speech && <Em>({question?.part_of_speech})</Em>}
				{question?.pronounciation && <Em>{question?.pronounciation}</Em>}
			</React.Fragment>
		);
	};

	return (
		<Flex gap='4' align='center' justify='center' py='2' px='3' wrap='wrap'>
			<Flex align='center' justify='center' className='question'>
				{renderContent()}
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
