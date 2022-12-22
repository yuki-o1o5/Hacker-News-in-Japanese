import styles from "./TableHeader.module.css";

const TableHeader = () => {
  return (
    <div className={styles.tableHeader}>
      <p className={styles.tableTitle}>Title</p>
      <p className={styles.tablePoints}>Score</p>
    </div>
  );
};

export default TableHeader;
