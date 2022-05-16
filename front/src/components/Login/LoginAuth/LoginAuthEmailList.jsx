const LoginAuthEmailList = (props) => {
  const { email, setShowEmailsList, setEmailPlaceHolder } = props;

  const handleClick = ({ target }) => {
    const { innerText: targetEmail } = target;
    setEmailPlaceHolder(targetEmail);
    setShowEmailsList(false);
  };

  return (
    <li onClick={handleClick}>{email}</li>
  );
};

export default LoginAuthEmailList;