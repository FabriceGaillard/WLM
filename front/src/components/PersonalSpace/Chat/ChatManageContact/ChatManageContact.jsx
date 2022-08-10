// COMPONENTS
import { ChatManageContactButtonAdd, ChatManageContactButtonBlock } from '../chatIndex';

const ChatManageContact = () => {
  return (
    <div className="chat__manage-contact">
      <ChatManageContactButtonAdd />
      <ChatManageContactButtonBlock />
    </div>
  );
};

export default ChatManageContact;