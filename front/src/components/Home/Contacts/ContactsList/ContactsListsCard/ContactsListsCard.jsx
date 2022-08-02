// HOOKS
import { useState, useContext } from 'react';
// COMPONENTS
import { ContactsListsCardContextMenu, ContactsListsCardButtonDetails, ContactsListsCardButtonSimple } from "../../contactsIndex";
// CONTEXT
import homeContext from '../../../../../contexts/homeContext';

const ContactsListsCard = ({ data }) => {

  const { relatedUser, id, contactsContextMenu, setContactsContextMenu } = data;

  const { settings } = useContext(homeContext);
  const { showDetails } = settings.sortShowOptions;

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
    <li className={`user__card__${showDetails ? "details" : "simple"}`}>
      {showDetails
        ? <ContactsListsCardButtonDetails
          handleContextMenu={handleContextMenu}
          relatedUser={relatedUser}
        />
        : <ContactsListsCardButtonSimple
          handleContextMenu={handleContextMenu}
          relatedUser={relatedUser}
        />
      }
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