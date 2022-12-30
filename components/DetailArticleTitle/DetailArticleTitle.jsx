import styles from "./DetailArticleTitle.module.css";

const DetailArticleTitle = (props) => {
  return (
    <div className={styles.detailArticleTitle}>{props.detailArticleTitle}</div>
  );
};

export default DetailArticleTitle;
