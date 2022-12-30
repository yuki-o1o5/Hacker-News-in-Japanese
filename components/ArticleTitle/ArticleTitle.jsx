import styles from "./ArticleTitle.module.css";

const ArticleTitle = ({ articleTitle }) => {
  return <div className={styles.articleTitle}>{articleTitle}</div>;
};

export default ArticleTitle;
