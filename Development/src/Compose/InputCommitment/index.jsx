import { FaUser } from "react-icons/fa";
import styles from "../../styles/InputCommitment.module.css";

const InputCommitment = ({ onInputChange }) => {
  return (
    <>
      <input
        className={styles.InputCommitment}
        type="text"
        placeholder="Digite o compromiso"
        onChange={(event) => onInputChange(event.currentTarget.value)}
      />
      <FaUser className="icon" />
    </>
  );
};
export default InputCommitment;
