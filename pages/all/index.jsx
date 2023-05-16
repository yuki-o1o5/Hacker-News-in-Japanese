
import PageTitle from "../../components/PageTitle/PageTitle.jsx";
import ArticlesCategoryTitle from "../../components/ArticlesCategoryTitle/ArticlesCategoryTitle.jsx";
import TableHeader from "../../components/TableHeader/TableHeader.jsx";
import DayTitleAndPoints from "../../components/DayTitleAndPoints/DayTitleAndPoints.jsx";
import PageDescription from "../../components/PageDescription/PageDescription.jsx";
import { getStoryDetail } from "../../helpers/hackerNews/storyDetail";
import { translateStoryDetail } from "../../helpers/deepl/translateStoryDetail";
import { JA } from "../../constants/deepl";

export async function getServerSideProps() {
  let topStoriesIds = [];
  try {
    const getTopStoriesIdsRes = await fetch(
      `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty&limitToFirst=10&orderBy="$key"`
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

  const japaneseTopStoriesDetails = await Promise.all(
    topStoriesDetails.map((topStoryDetail) =>
      translateStoryDetail(topStoryDetail, JA)
    )
  );

  return {
    props: { japaneseTopStoriesDetails },
  };
}

const AllPage = (props) => {
  return (
    <div>
      <PageTitle />
      <div className={"main_container"}>
        <ArticlesCategoryTitle articlesCategoryTitle={"Recent Top 10"} />
        <TableHeader />
        {props.japaneseTopStoriesDetails.map((japaneseTopStoryDetail) => (
          <DayTitleAndPoints
            key={`japaneseStoryDetail-list-${japaneseTopStoryDetail.id}`}
            dayTitle={japaneseTopStoryDetail.title}
            dayPoints={japaneseTopStoryDetail.score}
            id={japaneseTopStoryDetail.id}
          />
        ))}
        <PageDescription />
      </div>
    </div>
  );
};

export default AllPage;
