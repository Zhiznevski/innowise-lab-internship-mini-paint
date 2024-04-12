import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';

function RootPage() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
export default RootPage;
