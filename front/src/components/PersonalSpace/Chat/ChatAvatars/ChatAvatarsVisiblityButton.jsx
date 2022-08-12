// HOOKS
import { useContext } from 'react';
// CONTEXT
import PersonalSpaceContext from '../../../../contexts/PersonalSpaceContext';
// ICONS
import AvatarsArrow from '../../../../icons/avatarsArrow';

const ChatAvatarsVisiblityButton = () => {

  const { settings, setSettings } = useContext(PersonalSpaceContext);
  const { chat } = settings;

  const handleAvatarsVisibility = () => {
    const settingsClone = structuredClone(settings);
    const { chat } = settingsClone;
    chat.hidePanel = !chat.hidePanel;

    setSettings(settingsClone);
  };

  return (
    <button
      type="button"
      className={`avatars-visibility__button${chat.hidePanel ? " hide" : ""}`}
      onClick={handleAvatarsVisibility}
    >
      <AvatarsArrow />
    </button>
  );
};

export default ChatAvatarsVisiblityButton;