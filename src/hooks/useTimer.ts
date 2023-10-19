import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../consts';

export const useTimer = (timer?: number) => {
	const navigate = useNavigate();
	const [seconds, setSeconds] = useState<number>();

	useEffect(() => {
		if (!timer) return;
		let seconds = timer * 60;
		const timeout = setInterval(() => {
			if (seconds === 0) {
				clearInterval(timeout);
				navigate(APP_ROUTES.complete);
			}
			seconds -= 1;
			setSeconds(seconds);
		}, 1000);
		return () => clearInterval(timeout);
	}, [timer]);

	return { seconds };
};
