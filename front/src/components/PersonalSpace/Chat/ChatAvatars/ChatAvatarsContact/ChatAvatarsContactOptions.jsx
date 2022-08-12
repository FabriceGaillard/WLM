// HOOKS
import { useState, useRef, useEffect, useCallback, useContext } from 'react';
// HELPERS
import clickOutside from "../../../../../helpers/clickOutside";
import { hidePanel } from '../../../../../helpers/chat/avatars';
import blockContact from "../../../../../helpers/home/contacts/list/blockContact";
// COMPONENTS
import { ChatAvatarsOptionsSizes } from "../../chatIndex";
// CONTEXT
import PersonalSpaceContext from "../../../../../contexts/PersonalSpaceContext";

const ChatAvatarsContactOptions = (props) => {

  const { dropDownButtonTarget, setShowOptions } = props;

  const { setSettings } = useContext(PersonalSpaceContext);
  const settingsMenuRef = useRef(null);
  const sizeOptionsRef = useRef(null);

  const [showSizeOptions, setShowSizeOptions] = useState(false);

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
      className="chat__avatars--options"
      ref={settingsMenuRef}
      onClick={() => setShowOptions(false)}
    >
      <li className="options-list" onClick={blockContact}>
        Bloquer ce contact
      </li>
      <li
        className="options-list"
        onMouseEnter={() => setShowSizeOptions(true)}
        onMouseLeave={() => setShowSizeOptions(false)}
        ref={sizeOptionsRef}
      >
        Taille
      </li>
      <li className="options-list" onClick={() => hidePanel(setSettings)}>
        Masquer les images persos
      </li>
      {(showSizeOptions) && <ChatAvatarsOptionsSizes setShowSizeOptions={setShowSizeOptions} />}
    </ul>
  );
};

export default ChatAvatarsContactOptions;