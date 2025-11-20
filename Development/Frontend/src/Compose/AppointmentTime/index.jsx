import Styles from "../../Styles/AppointmentTime.module.css";

const AppointmentTime = ({ getDate }) => {
  return (
    <>
      <input
        className={Styles.AppointmentTime}
        type="time"
        onChange={(event) => getDate(event.currentTarget.value)}
      />
    </>
  );
};
export default AppointmentTime;
