// HOOKS
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, } from "react-router-dom";
// COMPONENTS
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import ResetPasswordAsk from './components/ResetPassword/AskResetPassword/AskResetPassword';
import ResetPassword from './components/ResetPassword/ResetPassword/ResetPassword';
import Taskbar from './components/Taskbar/Taskbar';
import PersonalSpace from './components/PersonalSpace/PersonalSpace';

// CONTEXT
import globalContext from './contexts/GlobalContext';
// OUTLET
import PrivateRoutes from './PrivateRoutes';

const App = () => {

  const [userDataFromDb, setUserDataFromDb] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [showMenu, setShowMenu] = useState(true);

  const globalContextOptions = {
    userDataFromDb,
    setUserDataFromDb,
    contacts,
    setContacts,
    showMenu,
    setShowMenu
  };

  return (
    <globalContext.Provider value={globalContextOptions}>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes userDataFromDb={userDataFromDb} />}>
            <Route path="/" element={<PersonalSpace />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/reset-password/demand' element={<ResetPasswordAsk />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
      <Taskbar />
    </globalContext.Provider>
  );
};

export default App;
