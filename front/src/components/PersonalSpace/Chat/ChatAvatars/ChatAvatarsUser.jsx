// COMPONENTS
import AvatarBig from '../../../Common/AvatarBig';
// DATA
import defaultAvatarBase64 from "../../../../data/defaultAvatarBase64";
// ICON
import ArrowIcon from "../../../../icons/dropDownArrow";

const ChatAvatarsUser = () => {
  return (
    <div className="chat__avatars">
      <AvatarBig src={defaultAvatarBase64} />
      <button
        type="button"
        className="avatar__big--settings"
      >
        <ArrowIcon />
      </button>
    </div>
  );
};
export default ChatAvatarsUser;