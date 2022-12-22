import styles from "./DetailArticleCommentParent.module.css";

const DetailArticleCommentParent = (props) => {
  return (
    <div
      className={styles.detailArticleCommentParent}
      dangerouslySetInnerHTML={{ __html: props.detailArticleCommentParent }}
    />
  );
};

export default DetailArticleCommentParent;
