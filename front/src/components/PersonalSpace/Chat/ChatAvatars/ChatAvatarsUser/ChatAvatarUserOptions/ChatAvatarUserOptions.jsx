// HOOKS
import { useState, useRef, useEffect, useCallback, useContext } from 'react';
// HELPERS
import clickOutside from "../../../../../../helpers/clickOutside";
import { hidePanel } from '../../../../../../helpers/chat/avatars';
// COMPONENTS
import { ChatAvatarsOptionsSizes, ChatAvatarUserOptionsLatest, ChatAvatarUserOptionsModify } from "../../../chatIndex";
// CONTEXT
import PersonalSpaceContext from "../../../../../../contexts/PersonalSpaceContext";

const ChatAvatarUserOptions = (props) => {
  const { dropDownButtonTarget, setShowOptions } = props;

  const { setSettings } = useContext(PersonalSpaceContext);
  const settingsMenuRef = useRef(null);
  const sizeOptionsRef = useRef(null);

  const [showSizeOptions, setShowSizeOptions] = useState(false);

  const handleMenuClick = ({ target }) => {
    const isClickingOnSizeOption = sizeOptionsRef.current.contains(target);
    if (isClickingOnSizeOption === true) {
      return;
    }

    setShowOptions(false);
  };

  const clickOutsideHandler = useCallback((e) => {
    const options = [
      settingsMenuRef,
      setShowOptions,
      dropDownButtonTarget,
      e.target
    ];

    clickOutside(...options);
  }, []);

  useEffect(() => {
    document.addEventListener('click', clickOutsideHandler);

    return () => {
      document.removeEventListener('click', clickOutsideHandler);
    };
  }, []);

  return (
    <ul
      className="chat__avatars--options-user"
      ref={settingsMenuRef}
      onClick={handleMenuClick}
    >
      <ChatAvatarUserOptionsModify />
      <ChatAvatarUserOptionsLatest />
      <li
        className="options-list-user"
        onClick={() => setShowSizeOptions(true)}
        ref={sizeOptionsRef}
      >
        Taille
      </li>
      <li
        className="options-list-user"
        onClick={() => hidePanel(setSettings)}
      >
        Masquer les images persos
      </li>
      {(showSizeOptions) && (
        <ChatAvatarsOptionsSizes setShowSizeOptions={setShowSizeOptions} target="user" />
      )}
    </ul>
  );
};



export default ChatAvatarUserOptions;