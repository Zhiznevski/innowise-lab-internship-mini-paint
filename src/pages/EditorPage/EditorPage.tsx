import { useAuthState } from 'react-firebase-hooks/auth';
import Canvas from '../../components/Canvas/Canvas';
import ToolsPanel from '../../components/ToolsPanel/ToolsPanel';
import { auth } from '../../services/firebase/config';

function EditorPage() {
  const [user] = useAuthState(auth);
  return (
    <div>
      <Canvas user={user} />
      <ToolsPanel />
    </div>
  );
}
export default EditorPage;
