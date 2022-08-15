// HOOKS
import { useContext } from 'react';
// CONTEXT
import PersonalSpaceContext from '../../../../contexts/PersonalSpaceContext';
// HELPERS
import { handleAvatarSize } from '../../../../helpers/chat/avatars';

const ChatAvatarsOptionsSizes = ({ setShowSizeOptions, target }) => {

  const { setSettings } = useContext(PersonalSpaceContext);

  return (
    <ul
      className="options-list-size"
      onMouseEnter={() => setShowSizeOptions(true)}
      onMouseLeave={() => setShowSizeOptions(false)}
    >
      <li onClick={() => handleAvatarSize(false, setSettings, target)}>Moyenne</li>
      <li onClick={() => handleAvatarSize(true, setSettings, target)}>Petite</li>
    </ul>
  );
};

export default ChatAvatarsOptionsSizes;