import styles from "./DetailArticleCommentParent.module.css";

const DetailArticleCommentParent = (props) => {
  return <p className={styles.detailArticleCommentParent}>{props.detailArticleCommentParent}</p>;
};

export default DetailArticleCommentParent;
