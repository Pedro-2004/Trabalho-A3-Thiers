import { useState } from "react";
import { FaUser } from "react-icons/fa";
import "./style.css";

import LoginButton from "../../Compose/LoginButton";
import InputCommitment from "../../Compose/InputCommitment/index";
import DateCommitment from "../../Compose/DateCommitment";
import AppointmentTime from "../../Compose/AppointmentTime";

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
          <InputCommitment onInputChange={setCommitment} />
        </div>
        <div className="input-field">
          <AppointmentTime getDate={setHora} />
        </div>
        <DateCommitment onDateChange={setDate} />
        <LoginButton />
      </form>
    </div>
  );
};

export default CommitmentRegistration;
