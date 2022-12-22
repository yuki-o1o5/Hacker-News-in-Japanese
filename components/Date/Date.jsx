import styles from "./Date.module.css";

const Date = (props) => {
  return <div className={styles.date}>{props.date}</div>;
};

export default Date;
