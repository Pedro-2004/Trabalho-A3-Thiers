import Styles from "../../styles/DateCommitment.module.css";
const DateCommitment = ({ onDateChange }) => {
  return (
    <>
      <input
        className={Styles.DateCommitment}
        type="date"
        placeholder="Insira a data do compromisso "
        onChange={(event) => onDateChange(event.currentTarget.value)}
      />
    </>
  );
};

export default DateCommitment;
