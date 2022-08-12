import imageToBlobToBase64 from './imageToBlobToBase64';
import defaultUserSettings from '../data/home/defaultUserSettings';

const getLocalStorageUsers = () => {
  const findUsersInStorage = localStorage.getItem("users");

  if (findUsersInStorage) {
    return JSON.parse(findUsersInStorage);
  }

  return {
    stored: [],
    current: null
  };
};

const addStorageSettings = (settings) => {
  localStorage.setItem("settings", JSON.stringify(settings));
};

const getLocalStorageSettings = () => {
  const findSettingsInStorage = localStorage.getItem("settings");

  if (findSettingsInStorage) {
    return JSON.parse(findSettingsInStorage);
  }

  return defaultUserSettings;
};

const removeStorageCurrent = (users) => {
  if (users.current) {
    users.current = null;
  }

  localStorage.setItem("users", JSON.stringify(users));
};

const handleStorageWhenAuthenticated = async (currentUser, autoAuth, rememberEmail) => {
  currentUser.lastConnection = Date.now();

  let users = getLocalStorageUsers();

  if (autoAuth === false) {
    users.current = null;
  }

  if (rememberEmail === false) {
    users.stored = users.stored.filter(user => user.id !== currentUser.id);
  }

  if (rememberEmail === true) {
    const currentUserIndexInStored = users.stored.findIndex(user => user.id === currentUser.id);
    if (currentUserIndexInStored !== -1) {
      users.stored.splice(currentUserIndexInStored, 1);
    }

    const avatarBase64 = await imageToBlobToBase64(currentUser.avatar);
    const currentUserAvatarBase64 = { ...currentUser, avatar: avatarBase64 };
    users.stored.unshift(currentUserAvatarBase64);

    if (autoAuth) {
      users.current = currentUserAvatarBase64;
    }
  }

  localStorage.setItem("users", JSON.stringify(users));
};

const deleteOneUserFromStorage = (emailInput, setStorageData) => {
  let users = getLocalStorageUsers();

  if (users.stored.length === 0) {
    return;
  }
  const storedIndex = users.stored.findIndex(({ email }) => {
    return email === emailInput;
  });
  if (storedIndex !== -1) {
    users.stored.splice(storedIndex, 1);

    if (users.current && users.current.email === emailInput) {
      users.current = null;
    }

    localStorage.setItem("users", JSON.stringify(users));
    setStorageData(users);
  }
};

export { getLocalStorageUsers, handleStorageWhenAuthenticated, deleteOneUserFromStorage, removeStorageCurrent, getLocalStorageSettings, addStorageSettings };