import { Flex } from '@radix-ui/themes';

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
}) => {
	return (
		<Flex
			align='center'
			justify='center'
			className={`option-item ${selected === value ? 'selected' : 'no-select'}`}
			onClick={() => handleSelect(value)}
			position='relative'
		>
			{value}
		</Flex>
	);
};

export default Option;
