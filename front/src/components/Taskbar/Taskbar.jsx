// HOOKS
import { useContext } from 'react';
// CONTEXT
import globalContext from '../../contexts/GlobalContext';

const Taskbar = () => {

  const { showMenu, setShowMenu } = useContext(globalContext);

  return (
    <div className="taskbar">
      <button className="start-button">start</button>
      <button onClick={() => setShowMenu(prev => !prev)}>MSN Messenger</button>
    </div>
  );
};

export default Taskbar;