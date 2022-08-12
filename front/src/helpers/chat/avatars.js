const handleAvatarSize = (isAvatarSmall, setSettingsState) => {
  setSettingsState(previousSettings => ({
    ...previousSettings,
    chat: {
      ...previousSettings.chat,
      contactAvatarSmall: isAvatarSmall
    }
  }));
};

const hidePanel = (setSettingsState) => {
  setSettingsState(previousSettings => ({
    ...previousSettings,
    chat: {
      ...previousSettings.chat,
      hidePanel: true
    }
  }));
};


export { hidePanel, handleAvatarSize };