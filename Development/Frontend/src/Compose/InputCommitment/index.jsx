import { FaEdit } from "react-icons/fa";
import Styles from "../../styles/InputCommitment.module.css";

const InputCommitment = ({ onInputChange }) => {
  return (
    <div className={Styles.InputWrapper}>
      <input
        className={Styles.InputCommitment}
        type="text"
        placeholder="Digite o compromisso "
        onChange={(event) => onInputChange(event.currentTarget.value)}
      />
      <FaEdit className={Styles.Icon} />
    </div>
  );
};
export default InputCommitment;
