import styles from "./ArticlePoints.module.css";

const ArticlePoints = ({ articlePoints }) => {
  return <p className={styles.articlePoints}>{articlePoints}</p>;
};

export default ArticlePoints;
