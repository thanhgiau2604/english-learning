import './styles.css';
import HomePage from './pages/home';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import QuizPage from './pages/quiz';
import CompletePage from './pages/complete';

export default function App() {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <HomePage />,
		},
		{
			path: 'quiz',
			element: <QuizPage />,
		},
		{
			path: 'complete',
			element: <CompletePage />,
		},
	]);

	return <RouterProvider router={router} />;
}
