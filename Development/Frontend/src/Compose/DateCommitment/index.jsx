import Styles from "../../styles/DateCommitment.module.css";
const DateCommitment = ({ onDateChange }) => {
  return (
    <div className={Styles.InputWrapper}>
      <input
        className={Styles.DateCommitment}
        type="date"
        placeholder="Insira a data do compromisso "
        onChange={(event) => onDateChange(event.currentTarget.value)}
      />
    </div>
  );
};

export default DateCommitment;
