import React from "react";
import { useNavigate } from "react-router-dom";
import InputEmail from "../InputEmail/index";

const LoginButton = () => {
  const navigate = useNavigate();

  const handleLoginPage = () => {
    navigate("/CommitmentRegistration");
  };

  return (
    <>
      <button onClick={handleLoginPage}> Acessar</button>
    </>
  );
};

export default LoginButton;
