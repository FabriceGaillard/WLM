// HOOKS
import { useRef } from 'react';
// DATA
import statusList from '../../../../../data/login/statusList';
// HELPERS
import openContactConversation from '../../../../../helpers/home/contacts/list/openContactConversation';

const ContactsListsCardButtonSimple = (props) => {

  const { relatedUser, handleContextMenu, removeCurrentContextMenu } = props;
  const { username, personalMessage } = relatedUser;

  const buttonRef = useRef();

  return (
    <button
      className="user__card--button"
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
  );
};

export default ContactsListsCardButtonSimple;