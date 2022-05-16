import userStatus from '../../data.js/userStatus';

const LoginStatus = () => {

  return (
    <div className="status__container">
      <label htmlFor="selectStatus">Statut :</label>
      <select id="selectStatus">
        {userStatus
          .map((status, index) => (
            <option key={index} value={status}>{status}</option>
          ))}
      </select>
    </div>
  );

};

export default LoginStatus;