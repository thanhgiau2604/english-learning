import { useRecoilState, useRecoilValue } from 'recoil';
import { categoryState, settingState } from '../atoms/app';
import { Flex, Box, Text, Strong } from '@radix-ui/themes';
import { motion } from 'framer-motion';
import { CATEGORY_ANIMATE, CATEGORY_VARIANTS } from '../consts';
import { CategoryItem } from '../interface';

const Category = () => {
	const categories = useRecoilValue(categoryState);
	const [setting, setSetting] = useRecoilState(settingState);

	const handleSelectCategory = (category: CategoryItem) => {
		setSetting({ ...setting, selectedCategory: category.title });
	};

	return (
		<Box className='category-list'>
			<Text size='4'>
				<Strong>Category List:</Strong>
			</Text>
			<Flex gap='4' className='category-list-wrapper'>
				{categories.map(c => {
					const isActive = setting.selectedCategory === c.title;

					return (
						<motion.div
							{...CATEGORY_ANIMATE}
							key={c.title}
							className='category-item'
							variants={CATEGORY_VARIANTS}
							initial='normal'
							animate={isActive ? 'active' : 'normal'}
							whileHover={isActive ? 'active' : 'hovering'}
							onClick={() => handleSelectCategory(c)}
						>
							<h3>{c.title}</h3>
						</motion.div>
					);
				})}
				{!categories.length && <Box>No category exist</Box>}
			</Flex>
		</Box>
	);
};

export default Category;
