// HOOKS
import { useRef, useEffect } from 'react';
// HELPERS
import clickOutside from '../../../../../helpers/clickOutside';

const ContactsManageSortShowMenu = (props) => {

  const { dropDownButtonTarget, setShowContactsSortMenu } = props;

  const sortMenuContainerRef = useRef(null);

  const sortStatus = () => {
    console.log("sortStatus");
  };

  const sortGroup = () => {
    console.log("sortGroup");
  };

  const sortPersonalSpace = () => {
    console.log("sortPersonalSpace");
  };

  const showDetails = () => {
    console.log("showDetails");
  };

  const showEveryContacts = () => {
    console.log("showEveryContacts");
  };

  const menuOptions = [
    { title: "Trier par statut", action: sortStatus },
    { title: "Trier par groupe", action: sortGroup },
    { title: "Trier par date de mise à jour des espaces perso", action: sortPersonalSpace },
    { title: "Afficher le détail des contacts", action: showDetails },
    { title: "Afficher tous les contacts", action: showEveryContacts }
  ];

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
      {menuOptions.map(({ action, title }, idx) => <li key={idx} onClick={action}>{title}</li>)}
    </ul>
  );
};

export default ContactsManageSortShowMenu;