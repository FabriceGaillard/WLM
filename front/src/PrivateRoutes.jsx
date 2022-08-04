// HOOKS
import { useState, useEffect, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// COMPONENTS
import Loader from './components/Loader';
// CONTEXT
import globalContext from './contexts/GlobalContext';
// HELPERS
import { fetchMe } from './helpers/fetchMethods/home';
import { fetchContacts } from './helpers/fetchMethods/general';

const PrivateRoutes = () => {

  const { userDataFromDb, setUserDataFromDb, setContacts } = useContext(globalContext);

  const [userAuthenticated, setUserAuthenticated] = useState("pending");

  useEffect(() => {
    if (userDataFromDb === null) {
      const getUserInfos = async () => {
        try {
          const userData = await fetchMe();
          const userContacts = await fetchContacts();
          setContacts(userContacts);
          setUserDataFromDb(userData);
        }
        catch (err) {
          console.log(err);
          setUserAuthenticated(false);
        }
      };

      getUserInfos();
    }

    if (userDataFromDb) {
      setUserAuthenticated(true);
    }

  }, [userDataFromDb]);

  return (
    userAuthenticated === "pending"
      ? <Loader />
      : userAuthenticated === true
        ? <Outlet />
        : <Navigate to="/login" />
  );
};

export default PrivateRoutes;