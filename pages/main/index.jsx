import Article from "../../components/Article/Article.jsx";
import ArticlesCategoryTitle from "../../components/ArticlesCategoryTitle/ArticlesCategoryTitle.jsx";
import PageDescription from "../../components/PageDescription/PageDescription.jsx";
import PageTitle from "../../components/PageTitle/PageTitle.jsx";

const Mainpage = () => {
  return (
    <div>
      <PageTitle />
      <div className={"main_container"}>
        <ArticlesCategoryTitle articlesCategoryTitle={"Recent in Hour"} />
        <Article
          articleTitle="faucibus ornare suspendisse sed nisi lacus sed"
          articleNumber="1"
          articleAuthor="by nunc sed"
          articleTime="d2022,01,01"
          articlePoints="100"
        />
        <PageDescription />
      </div>
    </div>
  );
};

export default Mainpage;
