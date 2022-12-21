import styles from "./ArticlesCategoryTitle.module.css";

const ArticlesCategoryTitle = (props) => {
  return (
    <p className={styles.articlesCategoryTitle}>
      {props.articlesCategoryTitle}
    </p>
  );
};

export default ArticlesCategoryTitle;
