import { useState } from "react";
import InputEmail from "../../Compose/InputEmail";
import InputPassword from "../../Compose/InputPassword/index";
import LoginButton from "../../Compose/LoginButton";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert("Erro ao logar: " + (data.erro || data.message));

        return;
      }

      // ⬇ SALVANDO TOKEN AQUI
      localStorage.setItem("token", data.token);

      alert("Login realizado com sucesso! 🔥 Token salvo no navegador");
      console.log("TOKEN →", data.token);
    } catch (error) {
      alert("Falha ao conectar com o servidor.");
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Página de Login</h1>

      <form onSubmit={handleLogin}>
        {/* precisa garantir que esses inputs retornem os valores */}
        <InputEmail onChangeEmail={setEmail} />
        <InputPassword onChangePassword={setPassword} />

        <LoginButton type="submit" />
      </form>
    </div>
  );
};

export default LoginPage;
