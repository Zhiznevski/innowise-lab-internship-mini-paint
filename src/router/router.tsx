import { createBrowserRouter } from 'react-router-dom';
import { EDITOR_ROUTE, HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../constants/routes';
import RootPage from '../pages/RootPage/RootPage';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import EditorPage from '../pages/EditorPage/EditorPage';
import RegistrationPage from '../pages/RegistrationPage/RegistrationPage';

const router = createBrowserRouter([
  {
    path: HOME_ROUTE,
    element: <RootPage />,
    errorElement: <ErrorPage />,
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
    element: <RegistrationPage />,
  },
]);
export default router;
