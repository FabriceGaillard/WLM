// ICONS
import addUserIcon from "/assets/icons/chat/chat-add-user.png";
import addUserIconDisabled from "/assets/icons/chat/chat-add-user-disabled.png";

const ChatManageContactButtonAdd = () => {

  const handleAddUserToConversation = () => {
    console.log("handleAddUserToConversation");
  };

  return (
    <button type="button" onClick={handleAddUserToConversation}>
      <img src={addUserIconDisabled} />
    </button>
  );
};

export default ChatManageContactButtonAdd;