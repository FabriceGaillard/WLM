// HELPERS
import showDetails from '../../../helpers/home/contacts/show/showDetails';
import showEveryContacts from '../../../helpers/home/contacts/show/showEveryContacts';

const menuShowOptions = [
  {
    title: "Afficher le détail des contacts",
    action: showDetails,
    clicked: false
  },
  {
    title: "Afficher tous les contacts",
    action: showEveryContacts,
    clicked: false
  }
];

export default menuShowOptions;