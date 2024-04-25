import { useUser } from '../../hooks/useUser';
import { Canvas } from '../../modules/Canvas';
import { ToolPanels } from '../../modules/ToolsPanel';
import Spinner from '../../ui/Spinner/Spinner';

function EditorPage() {
  const { user, isLoading } = useUser();

  if (isLoading) {
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
