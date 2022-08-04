// COMPONENTS
import Home from "./Home/Home";
import Chat from "./Chat/Chat";
// CONTEXT 
import PersonalSpaceContext from '../../contexts/PersonalSpaceContext';

const PersonalSpace = () => {
  return (
    <PersonalSpaceContext.Provider value="">
      <div className="personal-space">
        <Home />
        <Chat />
      </div>
    </PersonalSpaceContext.Provider>
  );
};

export default PersonalSpace;