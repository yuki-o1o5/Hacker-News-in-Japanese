import styles from "./DetailArticleTitle.module.css";

const DetailArticleTitle = (props) => {
  return (
    <h2 className={styles.detailArticleTitle}>{props.detailArticleTitle}</h2>
  );
};

export default DetailArticleTitle;
