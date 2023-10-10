import { Flex } from '@radix-ui/themes';
import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

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
	const {
		formState: { errors },
	} = useFormContext();

	const cls = classNames({
		'option-item': true,
		selected: selected === value,
		'no-select': selected !== value,
		error: !!errors.answer,
	});

	return (
		<Flex
			align='center'
			justify='center'
			className={cls}
			onClick={() => handleSelect(value)}
			position='relative'
		>
			{value}
		</Flex>
	);
};

export default Option;
