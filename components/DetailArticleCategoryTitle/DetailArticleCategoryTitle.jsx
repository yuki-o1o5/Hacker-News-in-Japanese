import styles from "./DetailArticleCategoryTitle.module.css";

const DetailArticleCategoryTitle = (props) => {
  return (
    <p className={styles.detailArticleCategoryTitle}>
      {props.detailArticleCategoryTitle}
    </p>
  );
};

export default DetailArticleCategoryTitle;
