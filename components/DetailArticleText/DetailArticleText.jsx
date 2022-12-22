import styles from "./DetailArticleText.module.css";

const DetailArticleText = (props) => {
  return <p className={styles.detailArticleText}>{props.detailArticleText}</p>;
};

export default DetailArticleText;
