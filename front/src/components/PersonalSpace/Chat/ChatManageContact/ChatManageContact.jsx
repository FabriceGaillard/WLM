// COMPONENTS
import { ChatManageContactButtonAdd, ChatManageContactButtonBlock } from '../chatIndex';

const ChatManageContact = () => {
  return (
    <div className="manage-contact">
      <ChatManageContactButtonAdd />
      <ChatManageContactButtonBlock />
    </div>
  );
};

export default ChatManageContact;