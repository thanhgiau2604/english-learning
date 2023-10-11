export const CORRECT_POINT_ANIMATE = {
	initial: { opacity: 1, y: 0 },
	animate: { opacity: 0, y: -10 },
	transition: { duration: 1 },
};

export const CATEGORY_VARIANTS = {
	normal: {
		opacity: 0.6,
		scale: 0.95,
		boxShadow:
			'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
	},
	active: {
		opacity: 1,
		scale: 1,
		boxShadow:
			'rgba(3, 171, 48, 0.3) 0px 3px 6px, rgba(3, 171, 48, 0.5) 0px 3px 6px',
	},
	hovering: {
		opacity: 1,
		scale: 1,
		boxShadow:
			'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
	},
};

export const CATEGORY_ANIMATE = {
	transition: { type: 'spring', damping: 30, stiffness: 150 },
};

export const APP_ROUTES = {
	home: '/',
	quiz: '/quiz',
	complete: '/complete',
};
