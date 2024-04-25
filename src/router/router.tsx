import { createBrowserRouter } from 'react-router-dom';
import { EDITOR_ROUTE, HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../constants/routes';
import RootPage from '../pages/RootPage/RootPage';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import EditorPage from '../pages/EditorPage/EditorPage';
import RegistrationPage from '../pages/RegistrationPage/RegistrationPage';
import { ProtectedRoute } from './ProtectedRoute';
import Root from './Root';

const router = createBrowserRouter([
  {
    path: HOME_ROUTE,
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: LOGIN_ROUTE,
        element: <LoginPage />,
      },
      {
        path: REGISTRATION_ROUTE,
        element: <RegistrationPage />,
      },

      {
        element: <ProtectedRoute />,
        children: [
          {
            path: HOME_ROUTE,
            element: <RootPage />,
          },
          {
            path: EDITOR_ROUTE,
            element: <EditorPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
