import { Box, Flex } from '@radix-ui/themes';
import Option from '../components/Option';
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface OptionsProps {
	isCorrect?: boolean;
	values?: string[];
	questionKey: string;
}

const Options: React.FC<OptionsProps> = ({
	values,
	questionKey,
	isCorrect,
}) => {
	const { setValue, getValues, watch, trigger } = useFormContext();
	if (values?.length !== 4) return <></>;

	const handleSelect = (option: string) => {
		setValue('selected', option);
		trigger();
	};

	watch('selected');

	return (
		<Box mt='8' mx='2'>
			<Flex
				justify='center'
				wrap='wrap'
				style={{ rowGap: '20px', columnGap: '50px' }}
			>
				{values?.map((val, index) => {
					return (
						<React.Fragment key={val + index.toString()}>
							{!!index && index % 2 === 0 && <div className='break'></div>}
							<Option
								selected={getValues('selected')}
								value={val}
								handleSelect={handleSelect}
								questionKey={questionKey}
								isCorrect={isCorrect}
							/>
						</React.Fragment>
					);
				})}
			</Flex>
		</Box>
	);
};

export default Options;
