import { useState } from "react";
import { FaUser } from "react-icons/fa";
import "./style.css";

import LoginButton from "../../Compose/LoginButton";
import InputCommitment from "../../Compose/InputCommitment/index";
import DateCommitment from "../../Compose/DateCommitment";

const CommitmentRegistration = () => {
  const [hora, setHora] = useState("");
  const [date, setDate] = useState("");

  // Criamos um estado no componente pai para guardar o compromisso digitado
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
        date +
        "\n"
    );
  };
  return (
    <div className="container">
      <form onSubmit={handleSubnit}>
        <h1>Cadastra o compromisso</h1>
        <div className="input-field">
          // Aqui enviamos a função setCommitment para o componente filho // O
          nome "onInputChange" é só o nome da prop. // Na prática, estamos
          dizendo: "Filho, quando alguém digitar, chame essa função aqui".
          <InputCommitment onInputChange={setCommitment} />
        </div>
        <div className="input-field">
          <input
            type="time"
            placeholder="Hora do compromisso "
            onChange={(e) => setHora(e.target.value)}
          />
        </div>
        <DateCommitment onDateChange={setDate} />
        <LoginButton />
        {/* <button className='recall-forget'>Salvar compromisso</button> */}
      </form>
    </div>
  );
};

export default CommitmentRegistration;
