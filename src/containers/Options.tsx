import { Box, Flex } from '@radix-ui/themes';
import Option from '../components/Option';
import { useState } from 'react';
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface OptionsProps {
	values: string[];
	questionKey: string;
}

const Options: React.FC<OptionsProps> = ({ values, questionKey }) => {
	const { setValue, getValues, watch } = useFormContext();
	if (values?.length !== 4) return <></>;

	const handleSelect = (option: string) => {
		console.log('Vào');
		setValue('selected', option);
	};

	watch('selected');

	return (
		<Box mt='8' mx='2'>
			<Flex
				justify='center'
				wrap='wrap'
				style={{ rowGap: '20px', columnGap: '50px' }}
			>
				{values.map((val, index) => {
					return (
						<React.Fragment key={val}>
							{!!index && index % 2 === 0 && <div className='break'></div>}
							<Option
								selected={getValues('selected')}
								value={val}
								handleSelect={handleSelect}
								questionKey={questionKey}
							/>
						</React.Fragment>
					);
				})}
			</Flex>
		</Box>
	);
};

export default Options;
