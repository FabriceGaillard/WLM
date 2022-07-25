// HOOKS
import { useState, useRef } from 'react';
// COMPONENTS
import { ContactsManageSortShowMenu } from "../../contactsIndex";
// ICONS
import sortIcon from "/assets/icons/contactsManageIcons/contacts-manage-sort-icon.png";
import sortIconHover from "/assets/icons/contactsManageIcons/contacts-manage-sort-icon-hover.png";

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
        title="Trier vos contacts"
        onClick={handleSortMenu}
        ref={menuButtonRef}
      >
        <div className="sort-contact__button__img--container">
          <img src={sortIcon} className="notHover" alt="Icone de tri et affichage de contact" />
          <img src={sortIconHover} className="hover" alt="Icone de tri et affichage de contact au survol" />
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