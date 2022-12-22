import styles from "./DetailArticleCommentChild.module.css";

const DetailArticleCommentChild = (props) => {
  return (
    <p className={styles.detailArticleCommentChild}>
      {props.detailArticleCommentChild}
    </p>
  );
};

export default DetailArticleCommentChild;
