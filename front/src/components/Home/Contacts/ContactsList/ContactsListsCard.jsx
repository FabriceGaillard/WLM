// HOOKS
import { useState, useRef } from 'react';
// DATA
import statusList from '../../../../data/login/statusList';
// HELPERS
import openContactConversation from '../../../../helpers/home/contacts/list/openContactConversation';
// COMPONENTS
import { ContactsListsCardContextMenu } from "../contactsIndex";

const ContactsListsCard = ({ data }) => {

  const { relatedUser, id, contactsContextMenu, setContactsContextMenu } = data;
  const { email, avatar, username, personalMessage } = relatedUser;

  const buttonRef = useRef();

  const [contextMenuPosition, setContextMenuPostion] = useState(null);

  const addCurrentContextMenu = () => {
    if (contactsContextMenu.current !== id) {
      const currentContextMenuId = contactsContextMenu.current;
      setContactsContextMenu(prev => ({ ...prev, [id]: true, [currentContextMenuId]: false, current: id }));
      return;
    }

    setContactsContextMenu(prev => ({ ...prev, [id]: true, current: id }));
  };

  const removeCurrentContextMenu = () => {
    setContactsContextMenu(prev => ({ ...prev, [id]: false, current: id }));
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
    const home = document.querySelector(".home");

    const { x: leftHome, y: topHome } = home.getBoundingClientRect();
    const { clientX, clientY } = event;
    const x = clientX - leftHome;
    const y = clientY - topHome;

    setContextMenuPostion({ x, y });

    addCurrentContextMenu();
  };

  return (
    <li className="user__card">
      <button
        onDoubleClick={openContactConversation}
        onContextMenu={handleContextMenu}
        onClick={removeCurrentContextMenu}
        ref={buttonRef}
      >
        <img src={statusList.appearOffline.icon} />
        <p className="user__card--name">{username}</p>
        {personalMessage && (
          <p className="user__card--personal">
            <span className="dash">-</span>
            {personalMessage}
          </p>)}
      </button>
      {contactsContextMenu[id] && (
        <ContactsListsCardContextMenu
          position={contextMenuPosition}
          removeCurrentContextMenu={removeCurrentContextMenu}
          id={id}
        />
      )}
    </li>
  );
};

export default ContactsListsCard;