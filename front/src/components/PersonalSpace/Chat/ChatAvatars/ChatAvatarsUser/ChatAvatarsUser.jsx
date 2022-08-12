// HOOKS
import { useState, useRef, useContext } from 'react';
// COMPONENTS
import Avatar from '../../../../Common/Avatar';
import { ChatAvatarsContactOptions } from '../../chatIndex';
// DATA
import defaultAvatarBase64 from "../../../../../data/defaultAvatarBase64";
// ICON
import ArrowIcon from "../../../../../icons/dropDownArrow";
// CONTEXT
import PersonalSpaceContext from '../../../../../contexts/PersonalSpaceContext';

const ChatAvatarsContact = () => {

  const { settings } = useContext(PersonalSpaceContext);
  const { chat } = settings;

  const optionsButtonRef = useRef(null);

  const [showOptions, setShowOptions] = useState(false);
  const [dropDownButtonTarget, setDropDownButtonTarget] = useState(null);

  const handleSettings = ({ currentTarget }) => {
    if (showOptions) {
      optionsButtonRef.current.blur();
    }
    setDropDownButtonTarget(currentTarget);
    setShowOptions(previous => !previous);
  };

  return (
    <div className={`chat__avatars${chat.userAvatarSmall === true ? " small" : ""}`}>
      <Avatar src={defaultAvatarBase64} />
      <button
        type="button"
        ref={optionsButtonRef}
        onClick={handleSettings}
      >
        <ArrowIcon />
      </button>
      {showOptions && (
        <p>IN PROGRESS</p>
      )}
    </div>
  );
};

export default ChatAvatarsContact;