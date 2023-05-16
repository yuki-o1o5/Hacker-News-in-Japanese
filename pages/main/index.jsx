import Article from "../../components/Article/Article.jsx";
import ArticlesCategoryTitle from "../../components/ArticlesCategoryTitle/ArticlesCategoryTitle.jsx";
import PageDescription from "../../components/PageDescription/PageDescription.jsx";
import PageTitle from "../../components/PageTitle/PageTitle.jsx";
import { getStoryDetail } from "../../helpers/hackerNews/storyDetail";
import { translateStoryDetail } from "../../helpers/deepl/translateStoryDetail";
import { JA } from "../../constants/deepl";

export async function getServerSideProps() {
  let topStoriesIds = [];
  try {
    const getTopStoriesIdsRes = await fetch(
      `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty&limitToFirst=3&orderBy="$key"`
    );

    if (!getTopStoriesIdsRes.ok) {
      return {
        notFound: true,
      };
    }

    topStoriesIds = await getTopStoriesIdsRes.json();
  } catch (error) {
    return {
      notFound: true,
    };
  }

  const topStoriesDetails = await Promise.all(
    topStoriesIds.map((topStoryId) => getStoryDetail(topStoryId))
  );

  const japaneseTopStories = await Promise.all(
    topStoriesDetails.map((topStoryDetail) =>
      translateStoryDetail(topStoryDetail, JA)
    )
  );

  return {
    props: { japaneseTopStories },
  };
}

const Mainpage = (props) => {
  return (
    <div>
      <PageTitle />
      <div className={"main_container"}>
        <ArticlesCategoryTitle articlesCategoryTitle={"Recent Top 3"} />

        {props.japaneseTopStories.map((japaneseTopStory, i) => (
          <Article
            key={`japaneseStory-list-${japaneseTopStory.id}`}
            id={japaneseTopStory.id}
            articleTitle={japaneseTopStory.title}
            articleNumber={i + 1}
            articleAuthor={japaneseTopStory.by}
            articleTime={japaneseTopStory.time}
            articlePoints={japaneseTopStory.score}
          />
        ))}
        <PageDescription />
      </div>
    </div>
  );
};

export default Mainpage;
