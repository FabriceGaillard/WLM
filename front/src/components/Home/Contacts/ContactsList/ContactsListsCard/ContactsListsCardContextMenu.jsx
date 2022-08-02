// HOOKS
import { useEffect } from 'react';
// DATA
import menuContactsListOptions from '../../../../../data/home/contacts/menuContactsListOptions';

const ContactsListsCardContextMenu = (props) => {

  const { position, removeCurrentContextMenu } = props;

  const { x, y } = position;

  useEffect(() => {
    document.addEventListener("click", removeCurrentContextMenu);

    return () => {
      document.removeEventListener("click", removeCurrentContextMenu);
    };
  }, []);

  return (
    <ul
      className="context-menu"
      style={{ top: y + "px", left: x + "px" }}
    >
      {menuContactsListOptions.map(({ title, action }, index) => (
        <li key={index}>
          <button onClick={action}>{title}</button>
        </li>
      ))}
    </ul>
  );
};

export default ContactsListsCardContextMenu;