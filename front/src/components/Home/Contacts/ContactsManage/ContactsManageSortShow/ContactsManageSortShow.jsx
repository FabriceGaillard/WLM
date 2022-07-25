// HOOKS
import { useState, useRef } from 'react';
// COMPONENTS
import { ContactsManageSortShowMenu } from "../../contactsIndex";

const ContactsManageSortShow = () => {

  const menuButtonRef = useRef(null);

  const [showContactsSortMenu, setShowContactsSortMenu] = useState(false);
  const [dropDownButtonTarget, setDropDownButtonTarget] = useState(null);

  const handleSortMenu = ({ target }) => {
    if (showContactsSortMenu) {
      menuButtonRef.current.blur();
    }
    setDropDownButtonTarget(target);
    setShowContactsSortMenu(previous => !previous);
  };

  return (
    <div className="sort-contact__container">
      <button
        type="button"
        className="sort-contact__button"
        onClick={handleSortMenu}
        ref={menuButtonRef}
      >
        <div className="sort-contact__button__img--container">
          <img src="/assets/icons/contactsManageIcons/contacts-manage-sort-icon.png" className="notHover" alt="" />
          <img src="/assets/icons/contactsManageIcons/contacts-manage-sort-icon-hover.png" className="hover" alt="" />
        </div>
      </button>
      {showContactsSortMenu && (
        <ContactsManageSortShowMenu
          dropDownButtonTarget={dropDownButtonTarget}
          setShowContactsSortMenu={setShowContactsSortMenu}
        />
      )}
    </div>
  );
};

export default ContactsManageSortShow;