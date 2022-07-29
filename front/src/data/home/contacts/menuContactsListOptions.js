// HELPERS
import openContactConversation from '../../../helpers/home/contacts/list/openContactConversation';
import addContactSurname from '../../../helpers/home/contacts/list/addContactSurname';
import blockContact from '../../../helpers/home/contacts/list/blockContact';
import deleteContact from '../../../helpers/home/contacts/list/deleteContact';

const menuContactsListOptions = [
  {
    title: "Envoyer un message différé",
    action: openContactConversation,
  },
  {
    title: "Ajouter un surnom",
    action: addContactSurname,
  },
  {
    title: "Bloquer le contact",
    action: blockContact,
  },
  {
    title: "Supprimer le contact",
    action: deleteContact,
  }
];

export default menuContactsListOptions;