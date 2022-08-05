// HOOKS
import { useContext } from 'react';
// CONTEXT
import globalContext from '../../contexts/GlobalContext';
// ICONS
import contactsManageIcon from "/assets/icons/base-icon-hq.png";

const Taskbar = () => {

  const { showMenu, setShowMenu } = useContext(globalContext);

  return (
    <div className="taskbar">
      <button className="start-button">start</button>
      <button className={`menu-button ${showMenu ? "focus" : ""}`} onClick={() => setShowMenu(prev => !prev)}>
        <img src={contactsManageIcon} />
        <p>MSN Messenger</p>
      </button>
    </div>
  );
};

export default Taskbar;