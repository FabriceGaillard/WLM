// HOOKS
import { useContext } from 'react';
// CONTEXT
import PersonalSpaceContext from '../../../../contexts/PersonalSpaceContext';
// COMPONENTS
import { ChatAvatarsUser, ChatAvatarsContact, ChatAvatarsVisiblityButton } from "../chatIndex";


const ChatAvatars = () => {

  const { settings } = useContext(PersonalSpaceContext);
  const { chat } = settings;

  return (
    <>
      <div className={`chat__avatars__panel${chat.hidePanel ? " hide" : ""}`}>
        <ChatAvatarsContact />
        <ChatAvatarsUser />
      </div>
      <ChatAvatarsVisiblityButton />
    </>
  );
};

export default ChatAvatars;