import { userRelationshipsApiUrl } from '../../data/apiUrls';
import options from '../../data/fetchOptions';

export const fetchContacts = async () => {
  const response = await fetch(userRelationshipsApiUrl, options);
  const users = await response.json();
  return users;
};
