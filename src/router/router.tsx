import { createBrowserRouter } from 'react-router-dom';
import {
  EDITOR_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
} from '../utils/constants/routes';
import RootPage from '../pages/RootPage/RootPage';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import FeedPage from '../pages/FeedPage/FeedPage';
import EditorPage from '../pages/EditorPage/EditorPage';

const router = createBrowserRouter([
  {
    path: HOME_ROUTE,
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: HOME_ROUTE,
        element: <FeedPage />,
      },
    ],
  },
  {
    path: EDITOR_ROUTE,
    element: <EditorPage />,
  },
  {
    path: LOGIN_ROUTE,
    element: <LoginPage />,
  },
  {
    path: REGISTRATION_ROUTE,
    element: <RegisterPage />,
  },
]);
export default router;
