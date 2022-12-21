import styles from "./ArticleTime.module.css";

const ArticleTime = ({ articleTime }) => {
  return <p className={styles.articleTime}>{articleTime}</p>;
};

export default ArticleTime;
