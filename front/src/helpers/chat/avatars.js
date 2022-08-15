const handleAvatarSize = (isAvatarSmall, setSettingsState, target) => {
  console.log({ target });
  if (target === "contact") {
    setSettingsState(previousSettings => ({
      ...previousSettings,
      chat: {
        ...previousSettings.chat,
        contactAvatarSmall: isAvatarSmall
      }
    }));

    return;
  }

  setSettingsState(previousSettings => ({
    ...previousSettings,
    chat: {
      ...previousSettings.chat,
      userAvatarSmall: isAvatarSmall
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