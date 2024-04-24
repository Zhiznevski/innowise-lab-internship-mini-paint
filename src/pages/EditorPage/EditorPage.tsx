import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../api/config';
import Spinner from '../../ui/Spinner/Spinner';
import { Canvas } from '../../modules/Canvas';
import { ToolPanels } from '../../modules/ToolsPanel';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { LOGIN_ROUTE } from '../../constants/routes';

function EditorPage() {
  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(LOGIN_ROUTE);
    }
  }, [user, navigate]);

  if (loading) {
    return <Spinner variant="circle" />;
  }

  return (
    <div>
      <Canvas user={user} />
      <ToolPanels />
    </div>
  );
}
export default EditorPage;
