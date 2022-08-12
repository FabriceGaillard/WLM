// COMPONENTS
import Avatar from '../../../Common/Avatar';
// DATA
import defaultAvatarBase64 from "../../../../data/defaultAvatarBase64";
// ICON
import ArrowIcon from "../../../../icons/dropDownArrow";

const ChatAvatarsUser = () => {
  return (
    <div className="chat__avatars">
      <Avatar src={defaultAvatarBase64} />
      <button
        type="button"
      >
        <ArrowIcon />
      </button>
    </div>
  );
};
export default ChatAvatarsUser;