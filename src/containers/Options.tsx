import { Box, Flex } from '@radix-ui/themes';
import Option from '../components/Option';

const Options = () => {
	return (
		<Box mt='8' mx='2'>
			<Flex gap='3' direction='column'>
				<Flex justify='center' gap='9'>
					<Option value='Option A' />
					<Option value='Option B' />
				</Flex>
				<Flex justify='center' gap='9'>
					<Option value='Option C' />
					<Option value='Option D' />
				</Flex>
			</Flex>
		</Box>
	);
};

export default Options;
