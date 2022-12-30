import styles from "./DetailArticleUrl.module.css";
import Link from "next/link.js";

const DetailArticleUrl = (props) => {
  return (
    <div>
      <Link href={props.DetailArticleUrl} target="_blank">
        <div className={styles.detailArticleUrl}>{props.DetailArticleUrl}</div>
      </Link>
    </div>
  );
};

export default DetailArticleUrl;
