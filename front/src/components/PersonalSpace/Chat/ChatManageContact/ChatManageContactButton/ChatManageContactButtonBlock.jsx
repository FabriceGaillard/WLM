// ICONS
import blockUserIcon from "/assets/icons/chat/chat-block-user.png";

const ChatManageContactButtonBlock = () => {

  const handleBlockContact = () => {
    console.log("handleBlockContact");
  };

  return (
    <button type="button" onClick={handleBlockContact}>
      <img src={blockUserIcon} />
    </button>
  );
};

export default ChatManageContactButtonBlock;