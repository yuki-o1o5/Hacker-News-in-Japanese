import styles from "./ArticleNumber.module.css";

const ArticleNumber = ({ articleNumber }) => {
  return <i className={styles.articleNumber}>{articleNumber}</i>;
};

export default ArticleNumber;
