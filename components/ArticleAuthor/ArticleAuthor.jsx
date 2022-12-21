import styles from "./ArticleAuthor.module.css";

const ArticleAuthor = (articleAuthor) => {
  return <p className={styles.articleAuthor}>{articleAuthor}</p>;
};

export default ArticleAuthor;
