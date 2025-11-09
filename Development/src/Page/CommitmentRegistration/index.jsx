import { useState } from "react";
import { FaUser } from "react-icons/fa";
import "./style.css";

import LoginButton from "../../Compose/LoginButton";
import InputCommitment from "../../Compose/InputCommitment/index";

const CommitmentRegistration = () => {
  const [hora, setHora] = useState("");
  const [data, setData] = useState("");
  const [commitment, setCommitment] = useState("");

  const handleSubnit = (event) => {
    event.preventDefault();

    alert(
      "Compromisso salvos com sucesso:\n" +
        "Pauta da reunião: " +
        commitment +
        "\n" +
        "Horário do compromisso: " +
        hora +
        "\n" +
        "Data do compromisso: " +
        data +
        "\n"
    );
  };
  return (
    <div className="container">
      <form onSubmit={handleSubnit}>
        <h1>Cadastra o compromisso</h1>
        <div className="input-field">
          <InputCommitment onInputChange={setCommitment} />
        </div>
        <div className="input-field">
          <input
            type="time"
            placeholder="Hora do compromisso "
            onChange={(e) => setHora(e.target.value)}
          />
        </div>
        <div className="input-field">
          <input
            type="date"
            placeholder="Data do comprimisso"
            onChange={(e) => setData(e.target.value)}
          />
        </div>
        <LoginButton />
        {/* <button className='recall-forget'>Salvar compromisso</button> */}
      </form>
    </div>
  );
};

export default CommitmentRegistration;
