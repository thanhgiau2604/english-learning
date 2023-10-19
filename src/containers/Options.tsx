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
	if (!values?.length) return <></>;

	const handleSelect = (option: string) => {
		setValue('answer', option);
		trigger();
	};

	watch('answer');

	return (
		<Box mt='8' mx='2'>
			<Flex justify='center' wrap='wrap' gap='5'>
				{values?.map((val, index) => {
					return (
						<React.Fragment key={val + index.toString()}>
							<Option
								selected={getValues('answer')}
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
