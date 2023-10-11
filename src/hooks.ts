import { useEffect, useState } from 'react';

export function useDebounce<T>(value?: T, delay?: number): T | undefined {
	const [debouncedValue, setDebouncedValue] = useState<T | undefined>(value);

	useEffect(() => {
		if (!value) return;
		const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

		return () => {
			clearTimeout(timer);
		};
	}, [value, delay]);

	return debouncedValue;
}
