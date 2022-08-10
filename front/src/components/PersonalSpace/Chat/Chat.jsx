// ICONS
import {
  ChatHeader,
  ChatManageContact,
  ChatAvatars,
  ChatFeed,
  ChatEntries
} from './chatIndex';

const Chat = () => {
  return (
    <div className="chat">
      <ChatHeader />
      <ChatManageContact />
      <ChatAvatars />
      <ChatFeed />
      <ChatEntries />
    </div>
  );
};

export default Chat;