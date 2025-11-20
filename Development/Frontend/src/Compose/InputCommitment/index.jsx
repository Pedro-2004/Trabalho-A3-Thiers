import { FaEdite } from "react-icons/fa";
import Styles from "../../styles/InputCommitment.module.css";

const InputCommitment = ({ onInputChange }) => {
  return (
    <div className={Styles.InputWrapper}>
      <input
        className={Styles.InputCommitment}
        type="text"
        placeholder="Digite o compromiso "
        onChange={(event) => onInputChange(event.currentTarget.value)}
      />
      <FaEdite className={Styles.Icon} />
    </div>
  );
};
export default InputCommitment;
