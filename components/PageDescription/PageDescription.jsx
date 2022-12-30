import styles from "./PageDescription.module.css";

const PageDescription = () => {
  return (
    <p className={styles.pageDescription}>
      このサイトは<a href="https://news.ycombinator.com/">Hacer News</a>
      から上位の記事をピックアップし、記事に対する最初のコメントを日本語訳に変換し表示するサイトです。
    </p>
  );
};

export default PageDescription;
