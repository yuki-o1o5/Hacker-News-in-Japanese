import Article from "../../components/Article/Article.jsx";
import ArticlesCategoryTitle from "../../components/ArticlesCategoryTitle/ArticlesCategoryTitle.jsx";
import PageDescription from "../../components/PageDescription/PageDescription.jsx";
import PageTitle from "../../components/PageTitle/PageTitle.jsx";

export async function getStaticProps() {
  // 1.This is top 3 story ids.
  const res = await fetch(
    `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty&limitToFirst=3&orderBy="$key"`
  );
  const topstories = await res.json();

  // 2.This is each story details.
  const getDetailUrl = async (id) => {
    const res = await fetch(
      "https://hacker-news.firebaseio.com/v0/item/" + id + ".json?print=pretty"
    );
    const eachStoryDetails = await res.json();
    return eachStoryDetails;
  };

  const stories = await Promise.all(
    topstories.map((topstory) => getDetailUrl(topstory))
  );

  return {
    props: { stories },
    revalidate: 10,
  };
}

const Mainpage = (props) => {
  return (
    <div>
      <PageTitle />
      <div className={"main_container"}>
        <ArticlesCategoryTitle articlesCategoryTitle={"Recent in Hour"} />

        {props.stories.map((story, i) => (
          <Article
            key={`story-list-${i}`}
            id={story.id}
            articleTitle={story.title}
            articleNumber={i + 1}
            articleAuthor={story.by}
            articleTime={story.time}
            articlePoints={story.score}
          />
        ))}

        <PageDescription />
      </div>
    </div>
  );
};

export default Mainpage;
