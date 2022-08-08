// ICONS
import chatHeaderIcon from "/assets/icons/chat/chat-header-icon.png";
// COMPONENTS
import { ChatHeaderReduceButton, ChatHeaderExtendButton, ChatHeaderCloseButton } from '../chatIndex';

const ChatHeader = () => {
  return (
    <header className="chat__header">
      <img className="chat__header--logo" src={chatHeaderIcon} />
      <p className="chat__header--pseudo">pseudo</p>
      <p className="chat__header--description">description</p>
      <div className="chat__header--window-manage">
        <ChatHeaderReduceButton />
        <ChatHeaderExtendButton />
        <ChatHeaderCloseButton />
      </div>
    </header>
  );
};

export default ChatHeader;