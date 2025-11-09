import InputEmail from "../../Compose/InputEmail";
import InputPassword from "../../Compose/InputPassword/index";
import LoginButton from "../../Compose/LoginButton";

const LoginPage = () => {
  return (
    <div className="container">
      <h1>Página de Login </h1>
      <InputEmail />
      <InputPassword />
      <LoginButton />
    </div>
  );
};
export default LoginPage;
