// HOOKS
import { useRef, useEffect } from 'react';
// HELPERS
import clickOutside from '/src/helpers/clickOutside';
// DATA
import menuSortOptions from '/src/data/home/contacts/menuSortOptions';
import menuShowOptions from '/src/data/home/contacts/menuShowOptions';

const ContactsManageSortShowMenu = (props) => {

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
      {menuSortOptions.map(({ action, title }, idx) => <li key={idx} onClick={action}>{title}</li>)}
      {menuShowOptions.map(({ action, title }, idx) => <li key={idx} onClick={action}>{title}</li>)}
    </ul>
  );
};

export default ContactsManageSortShowMenu;