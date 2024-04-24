import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../api/config';
import Spinner from '../../ui/Spinner/Spinner';
import { Canvas } from '../../modules/Canvas';
import { ToolPanels } from '../../modules/ToolsPanel';

function EditorPage() {
  const [user, loading] = useAuthState(auth);

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
