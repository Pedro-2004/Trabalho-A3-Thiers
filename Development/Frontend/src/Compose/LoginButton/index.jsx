import Styles from "../../Styles/LoginButton.module.css";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  const navigate = useNavigate();

  const handleLoginPage = () => {
    navigate("/CommitmentRegistration");
  };

  return (
    <>
      <button className={Styles.LoginButton} onClick={handleLoginPage}>
        Acessar
      </button>
    </>
  );
};

export default LoginButton;
