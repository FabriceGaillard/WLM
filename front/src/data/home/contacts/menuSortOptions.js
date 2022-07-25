// HELPERS
import sortStatus from '/src/helpers/home/contacts/sort/sortStatus';
import sortGroup from '/src/helpers/home/contacts/sort/sortGroup';
import sortPersonalSpace from '/src/helpers/home/contacts/sort/sortPersonalSpace';

const menuSortOptions = [
  {
    title: "Trier par statut",
    action: sortStatus,
    clicked: true
  },
  {
    title: "Trier par groupe",
    action: sortGroup,
    clicked: false
  },
  {
    title: "Trier par date de mise à jour des espaces perso",
    action: sortPersonalSpace,
    clicked: false
  }
];

export default menuSortOptions;