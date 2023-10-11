import { motion } from 'framer-motion';
import { QuestionItem } from '../interface';
import { Badge, Box } from '@radix-ui/themes';

interface QuestionMoreInfoProps {
	questionData: QuestionItem;
	isDisplay?: boolean;
}

const QuestionMoreInfo = ({
	questionData,
	isDisplay,
}: QuestionMoreInfoProps) => {
	if (
		isDisplay === undefined ||
		(!questionData.example && !questionData.explanation)
	)
		return <></>;

	return (
		<motion.div className='question-more-info'>
			{questionData?.example && (
				<Box mt='3'>
					<Badge color='orange' style={{ fontSize: '13px' }}>
						Example
					</Badge>
					<Box mt='1'>{questionData.example}</Box>
				</Box>
			)}
			{questionData?.explanation && (
				<Box mt='3'>
					<Badge color='blue' style={{ fontSize: '13px' }}>
						Explanation
					</Badge>
					<Box mt='1'>{questionData.explanation}</Box>
				</Box>
			)}
		</motion.div>
	);
};

export default QuestionMoreInfo;
