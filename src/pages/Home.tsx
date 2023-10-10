import { Box, Button } from '@radix-ui/themes';
import Settings from '../components/Settings';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { categoryState, rawDataState, settingState } from '../atoms/app';
import Papa from 'papaparse';
import { useEffect, useState } from 'react';
import LoadingOverlay from 'react-loading-overlay-ts';
import { CSVRow } from '../interface';
import { buildCategory } from '../utils';
import Category from '../components/Category';

const Home = () => {
	const navigate = useNavigate();
	const [setting, setSetting] = useRecoilState(settingState);
	const [loadingData, setLoadingData] = useState<boolean>(true);
	const [category, setCategory] = useRecoilState(categoryState);
	const [, setRawData] = useRecoilState(rawDataState);

	const handleStart = () => {
		setSetting({ ...setting, already: true });
		navigate('/quiz');
	};

	const url = process.env.REACT_APP_CSV_DATA_URL || '';

	useEffect(() => {
		if (!category?.length) {
			Papa.parse<CSVRow>(url, {
				download: true,
				header: true,

				complete: results => {
					let data = results.data;
					setCategory(buildCategory(data[0]));
					data.shift();
					setRawData(data);
					setLoadingData(false);
				},
				error: () => {
					setLoadingData(false);
					alert('Read data error');
				},
			});
		} else {
			setLoadingData(false);
		}
	}, []);

	return (
		<LoadingOverlay active={loadingData} spinner>
			<Box style={{ height: '100vh' }}>
				<Category />
				<Settings />
				<Box
					position='fixed'
					bottom='0'
					height='9'
					width='100%'
					className='home-footer'
				>
					<Button
						color='green'
						variant='soft'
						className='button-start'
						onClick={handleStart}
						disabled={!setting.selectedCategory}
					>
						Start quiz
					</Button>
				</Box>
			</Box>
		</LoadingOverlay>
	);
};

export default Home;
