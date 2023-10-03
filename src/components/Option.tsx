import { Flex } from '@radix-ui/themes';
import { motion } from 'framer-motion';
import { CORRECT_POINT_ANIMATE } from '../consts';

interface OptionProps {
	value: string;
	handleSelect: (option: string) => void;
	questionKey: string;
	selected?: string;
}

const Option: React.FC<OptionProps> = ({
	value = '',
	selected,
	handleSelect,
	questionKey,
}) => {
	const isCorrect = value === selected && selected === questionKey;
	const isWrong = value === selected && selected !== questionKey;
	return (
		<Flex
			align='center'
			justify='center'
			className={`option-item ${selected === value ? 'selected' : 'no-select'}`}
			onClick={() => handleSelect(value)}
			position='relative'
		>
			{value}
			{isCorrect && (
				<motion.div {...CORRECT_POINT_ANIMATE} className='point-add'>
					+10
				</motion.div>
			)}
			{isWrong && (
				<motion.div {...CORRECT_POINT_ANIMATE} className='point-sub'>
					-5
				</motion.div>
			)}
		</Flex>
	);
};

export default Option;
