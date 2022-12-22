import { useEffect, useState } from "react";
import ArticleTitle from "../ArticleTitle/ArticleTitle.jsx";
import ArticleAuthor from "../ArticleAuthor/ArticleAuthor.jsx";
import ArticleTime from "../ArticleTime/ArticleTime.jsx";
import ArticlePoints from "../ArticlePoints/ArticlePoints.jsx";
import ArticleNumber from "../ArticleNumber/ArticleNumber.jsx";
import styles from "./Article.module.css";
import Link from "next/link.js";

const Article = ({
  id,
  articleTitle,
  articleNumber,
  articleAuthor,
  articleTime,
  articlePoints,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <>
      {isClient ? (
        <Link href={`main/${id}`}>
          <div className={styles.article_primary_container}>
            <div className={styles.article_number_container}>
              <ArticleNumber articleNumber={articleNumber} />
            </div>
            <div className={styles.article_secondry_container}>
              <ArticleTitle articleTitle={articleTitle} />
              <div className={styles.article_tertiary_container}>
                <div className={styles.tertiary_container_children}>
                  <ArticleAuthor articleAuthor={articleAuthor} />
                </div>
                <div className={styles.tertiary_container_children}>
                  <ArticleTime articleTime={articleTime} />
                </div>
                <div className={styles.tertiary_container_children}>
                  <ArticlePoints articlePoints={articlePoints} />
                </div>
              </div>
            </div>
          </div>
        </Link>
      ) : null}
    </>
  );
};
export default Article;
