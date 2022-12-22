import styles from "./DetailArticleCommentChild.module.css";

const DetailArticleCommentChild = (props) => {
  return (
    <div
      className={styles.detailArticleCommentChild}
      dangerouslySetInnerHTML={{ __html: props.detailArticleCommentChild }}
    />
  );
};

export default DetailArticleCommentChild;
