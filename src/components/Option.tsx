import { Flex } from '@radix-ui/themes';
import { motion } from 'framer-motion';

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
				<motion.div
					className='point-add'
					initial={{ opacity: 1, y: 0 }}
					animate={{ opacity: 0, y: -10 }}
					transition={{ duration: 1 }}
				>
					+10
				</motion.div>
			)}
		</Flex>
	);
};

export default Option;
