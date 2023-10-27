import { motion } from 'framer-motion';
import { QuestionItem, QuestionType } from '../interface';
import { Badge, Box } from '@radix-ui/themes';
import { useRecoilValue } from 'recoil';
import { settingState } from '../atoms/app';
import { quizType } from '../utils';

interface QuestionMoreInfoProps {
	questionData: QuestionItem;
	isDisplay?: boolean;
	questionType: QuestionType;
}

const QuestionMoreInfo = ({
	questionData,
	isDisplay,
	questionType,
}: QuestionMoreInfoProps) => {
	const { useExplanation } = useRecoilValue(settingState);

	if (
		isDisplay === undefined ||
		(!questionData.example && !questionData?.explanation)
	)
		return <></>;

	const regex = new RegExp(questionData.content, 'g');
	const example = questionData?.example?.replace(regex, function (x) {
		return `<strong>${x}</strong>`;
	});

	return (
		<motion.div className='question-more-info'>
			<Box mt='3'>
				<Badge color='lime' style={{ fontSize: '13px' }}>
					Key
				</Badge>
				<Box mt='1'>
					{questionData.content}: {questionData?.pronounciation + '  '}{' '}
					{questionData.key}
				</Box>
			</Box>
			{example && (
				<Box mt='3'>
					<Badge color='orange' style={{ fontSize: '13px' }}>
						Example
					</Badge>
					<Box mt='1'>
						<p
							dangerouslySetInnerHTML={{
								__html: example,
							}}
							className='break-line'
						/>
					</Box>
				</Box>
			)}
			{!useExplanation && questionData?.explanation && (
				<Box mt='3'>
					<Badge color='blue' style={{ fontSize: '13px' }}>
						Explanation
					</Badge>
					<Box mt='1' className='break-line'>
						{questionData.explanation}
					</Box>
				</Box>
			)}
		</motion.div>
	);
};

export default QuestionMoreInfo;
