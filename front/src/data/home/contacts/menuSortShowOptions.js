// HELPERS
import sortStatus from '/src/helpers/home/contacts/sort/sortStatus';
import sortGroup from '/src/helpers/home/contacts/sort/sortGroup';
import showDetails from '/src/helpers/home/contacts/show/showDetails';
import showEveryContacts from '/src/helpers/home/contacts/show/showEveryContacts';

const menuSortShowOptions = [
  {
    title: "Trier par statut",
    action: sortStatus,
    key: "sortStatus",
    clicked: true
  },
  {
    title: "Trier par groupe",
    action: sortGroup,
    key: "sortGroup",
    clicked: false
  },
  {
    title: "Afficher le détail des contacts",
    action: showDetails,
    key: "showDetails",
    clicked: false
  },
  {
    title: "Afficher tous les contacts",
    action: showEveryContacts,
    key: "showEveryContacts",
    clicked: false
  }
];

export default menuSortShowOptions;