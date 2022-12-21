import styles from "./ArticleTitle.module.css";

const ArticleTitle = (articleTitle) => {
  return <h2 className={styles.articleTitle}>{articleTitle}</h2>;
};

export default ArticleTitle;
