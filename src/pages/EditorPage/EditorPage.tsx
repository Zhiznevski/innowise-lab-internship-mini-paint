import { useAuthState } from 'react-firebase-hooks/auth';
import Canvas from '../../components/Canvas/Canvas';
import ToolsPanel from '../../components/ToolsPanel/ToolsPanel';
import { auth } from '../../api/config';
import Spinner from '../../ui/Spinner/Spinner';

function EditorPage() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <Spinner variant="circle" />;
  }

  return (
    <div>
      <Canvas user={user} />
      <ToolsPanel />
    </div>
  );
}
export default EditorPage;
