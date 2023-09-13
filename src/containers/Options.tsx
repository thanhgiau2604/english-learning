import { Box, Flex } from '@radix-ui/themes';
import Option from '../components/Option';
import { useState } from 'react';

interface OptionsProps {
	values: string[];
	questionKey: string;
}

const Options: React.FC<OptionsProps> = ({ values, questionKey }) => {
	const [selected, setSelection] = useState<string>();
	if (values?.length !== 4) return <></>;

	const handleSelect = (option: string) => {
		setSelection(option);
	};

	return (
		<Box mt='8' mx='2'>
			<Flex
				justify='center'
				wrap='wrap'
				style={{ rowGap: '20px', columnGap: '50px' }}
			>
				{values.map((val, index) => {
					return (
						<>
							{!!index && index % 2 === 0 && <div className='break'></div>}
							<Option
								key={val}
								selected={selected}
								value={val}
								handleSelect={handleSelect}
								questionKey={questionKey}
							/>
						</>
					);
				})}
			</Flex>
		</Box>
	);
};

export default Options;
