// HOOKS
import { useRef, useEffect, useContext } from 'react';
// HELPERS
import clickOutside from '/src/helpers/clickOutside';
// DATA
import menuSortShowOptions from '../../../../../data/home/contacts/menuSortShowOptions';
// CONTEXT
import settingsContext from '../../../../../contexts/settingsContext';
// ICON
import CheckedOption from '../../../../../icons/checkedOption';

const ContactsManageSortShowMenu = (props) => {

  const { settings, setSettings } = useContext(settingsContext);


  const { dropDownButtonTarget, setShowContactsSortMenu } = props;

  const sortMenuContainerRef = useRef(null);

  const clickOutsideHandler = e => {
    const options = [
      sortMenuContainerRef,
      setShowContactsSortMenu,
      dropDownButtonTarget,
      e.target
    ];

    clickOutside(...options);
  };

  useEffect(() => {
    document.addEventListener('click', clickOutsideHandler);

    return () => {
      document.removeEventListener('click', clickOutsideHandler);
    };
  }, []);


  return (
    <ul
      className="contact-manage-sort__menu"
      ref={sortMenuContainerRef}
      onClick={() => setShowContactsSortMenu(false)}
    >
      {menuSortShowOptions.map(({ action, title, key }, idx) => (
        <li
          key={idx}
          data-checked={settings.sortShowOptions[key] ? "checked" : "unchecked"}
          onClick={({ target }) => action(target, settings, setSettings)}
        >
          <CheckedOption isShowing={settings.sortShowOptions[key]} />
          {title}
        </li>
      ))}
    </ul>
  );
};

export default ContactsManageSortShowMenu;