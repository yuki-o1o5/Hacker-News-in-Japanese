import Article from "../../components/Article/Article.jsx";
import ArticlesCategoryTitle from "../../components/ArticlesCategoryTitle/ArticlesCategoryTitle.jsx";
import PageDescription from "../../components/PageDescription/PageDescription.jsx";
import PageTitle from "../../components/PageTitle/PageTitle.jsx";

const Mainpage = (props) => {
  return (
    <div>
      <PageTitle />
      <div className={"main_container"}>
        <ArticlesCategoryTitle articlesCategoryTitle={"Recent in Hour"} />
        <Article
          articleNumber={"1"}
          articleTitle={"Lorem"}
          articleAuthor={"by nunc sed"}
          articleTime={"2022,01,01"}
          articlePoints={"96 p0ints"}
        />
        <PageDescription />
      </div>
    </div>
  );
};

export default Mainpage;
