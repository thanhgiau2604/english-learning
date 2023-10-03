import { Box } from '@radix-ui/themes';
import QuestionContent from './QuestionContent';
import Options from '../containers/Options';
import InputAnswer from './InputAnswer';
import SubmitButton from './SubmitButton';
import {
	Form,
	FormProvider,
	FormSubmitHandler,
	useForm,
} from 'react-hook-form';

interface QuestionProps {
	type: 'quiz' | 'text';
}

export interface FormValues {
	selected: string;
	answer: string;
}

const Question: React.FC<QuestionProps> = ({ type }) => {
	const onSubmit: FormSubmitHandler<FormValues> = data =>
		console.log(data.data);

	const method = useForm<FormValues>();
	return (
		<FormProvider {...method}>
			<Form onSubmit={onSubmit}>
				<Box>
					<QuestionContent value='Question content' />
					{type === 'quiz' ? (
						<>
							<Options values={['aa', 'bb', 'cc', 'dd']} questionKey='cc' />
							<Box style={{ textAlign: 'center' }} mt='4'>
								<SubmitButton />
							</Box>
						</>
					) : (
						<InputAnswer />
					)}
				</Box>
			</Form>
		</FormProvider>
	);
};

export default Question;
