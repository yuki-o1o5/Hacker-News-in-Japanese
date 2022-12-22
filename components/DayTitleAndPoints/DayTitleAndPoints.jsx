import styles from "./DayTitleAndPoints.module.css";

const DayTitleAndPoints = (props) => {
  return (
    <div className={styles.dayTitleAndPoints}>
      <p className={styles.dayTitle}>{props.dayTitle}</p>
      <p className={styles.dayPoints}>{props.dayPoints}</p>
    </div>
  );
};

export default DayTitleAndPoints;
