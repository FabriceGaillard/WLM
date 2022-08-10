// ICONS
import { ChatHeader, ChatManageContact } from './chatIndex';

const Chat = () => {
  return (
    <div className="chat">
      <ChatHeader />
      <ChatManageContact />
      <ChatFeed />
      <ChatEntries />
    </div>
  );
};

export default Chat;