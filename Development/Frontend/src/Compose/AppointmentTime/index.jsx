import Styles from "../../Styles/AppointmentTime.module.css";

const AppointmentTime = ({ getDate }) => {
  return (
    <div className={Styles.InputWrapper}>
      <input
        className={Styles.AppointmentTime}
        type="time"
        onChange={(event) => getDate(event.currentTarget.value)}
      />
    </div>
  );
};
export default AppointmentTime;
