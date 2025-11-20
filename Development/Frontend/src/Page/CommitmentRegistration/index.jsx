import { useState } from "react";
import { FaUser } from "react-icons/fa";
import "./style.css";
import Styles from "../../Styles/FromInCommitment.module.css";
import LoginButton from "../../Compose/LoginButton";
import InputCommitment from "../../Compose/InputCommitment/index";
import DateCommitment from "../../Compose/DateCommitment";
import AppointmentTime from "../../Compose/AppointmentTime";
import TransparentFasion from "../../Compose/TransparentFashion";
import TitleCommitmentRegistration from "../../Compose/TitleCommitmentRegistration";

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
    <TransparentFasion>
      <TitleCommitmentRegistration />
      <form className={Styles.FromInCommitment} onSubmit={handleSubnit}>
        <InputCommitment onInputChange={setCommitment} />

        <AppointmentTime getDate={setHora} />

        <DateCommitment onDateChange={setDate} />
        <LoginButton />
      </form>
    </TransparentFasion>
  );
};

export default CommitmentRegistration;
