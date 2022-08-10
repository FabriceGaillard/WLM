// COMPONENTS
import { ChatAvatarsUser, ChatAvatarsContact } from "../chatIndex";

const ChatAvatars = () => {
  return (
    <div className="chat__avatars__panel">
      <ChatAvatarsContact />
      <ChatAvatarsUser />
    </div>
  );
};

export default ChatAvatars;