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

  const handleSubnit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/commitments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // login precisa gerar isso
        },
        body: JSON.stringify({
          name: commitment,
          date,
          time: hora,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(
          "Compromisso salvo com sucesso, acesse o mongo para visualização! "
        );
        console.log("Salvo:", data);
      } else {
        alert("Erro ao salvar compromisso: " + data.message);
      }
    } catch (error) {
      alert("Falha na comunicação com o servidor.");
      console.error(error);
    }
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
