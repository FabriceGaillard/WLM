// HOOKS
import { useRef } from 'react';
// DATA
import statusList from '../../../../../data/login/statusList';
// HELPERS
import openContactConversation from '../../../../../helpers/home/contacts/list/openContactConversation';

const ContactsListsCardButtonDetails = (props) => {

  const { relatedUser, handleContextMenu, removeCurrentContextMenu } = props;
  const { email, avatar, username, personalMessage } = relatedUser;

  const buttonRef = useRef();

  return (
    <button
      className="user__card--button"
      onDoubleClick={openContactConversation}
      onContextMenu={handleContextMenu}
      onClick={removeCurrentContextMenu}
      ref={buttonRef}
    >
      <img src={statusList.appearOffline.icon} className="user__card--icon" />
      <div className="user__card--avatar__container">
        <img src={"http://localhost:3333/" + avatar} className="user__card--avatar" />
      </div>
      <p className="user__card--name">{username}</p>
      {personalMessage && (
        <p className="user__card--personal">{personalMessage}</p>
      )}
      <p className="user__card--email">{email}</p>
    </button>
  );
};

export default ContactsListsCardButtonDetails;