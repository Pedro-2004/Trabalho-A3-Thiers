import styles from "../../Styles/TransparentFasion.module.css";

const TransparentFasion = ({ children }) => {
  return (
    <>
      <div className={styles.TransparentFasion}>{children}</div>
    </>
  );
};

export default TransparentFasion;
