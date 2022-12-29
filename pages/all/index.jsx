import PageTitle from "../../components/PageTitle/PageTitle.jsx";
import TableHeader from "../../components/TableHeader/TableHeader.jsx";
import DayTitleAndPoints from "../../components/DayTitleAndPoints/DayTitleAndPoints.jsx";
import { getStoryDetail } from "../../helpers/hackerNews/storyDetail";
import { translateStoryDetail } from "../../helpers/deepl/translateStoryDetail";
import { JA } from "../../helpers/deepl/common";

export async function getStaticProps() {
  let topStoriesIds = [];
  try {
    const getTopStoriesIdsRes = await fetch(
      `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty&limitToFirst=10&orderBy="$key"`
    );
    if (!getTopStoriesIdsRes.ok) {
      return {
        notFound: true,
        revalidate: 10,
      };
    }
    topStoriesIds = await getTopStoriesIdsRes.json();
  } catch (error) {
    return {
      notFound: true,
      revalidate: 10,
    };
  }

  const topStoriesDetails = await Promise.all(
    topStoriesIds.map((topStoryId) => getStoryDetail(topStoryId))
  );

  //  3.This is each Japanese story details
  const japaneseTopStoriesDetails = await Promise.all(
    topStoriesDetails.map((topStoryDetail) =>
      translateStoryDetail(topStoryDetail, JA)
    )
  );

  return {
    props: { japaneseTopStoriesDetails },
    revalidate: 10,
  };
}

const Allpage = (props) => {
  return (
    <div>
      <PageTitle />
      <div className={"main_container"}>
        {/* <Date date={"December 1st"} /> */}
        <TableHeader />
        {props.japaneseTopStoriesDetails.map((japaneseTopStoryDetail) => (
          <DayTitleAndPoints
            key={`japaneseStoryDetail-list-${japaneseTopStoryDetail.id}`}
            dayTitle={japaneseTopStoryDetail.title}
            dayPoints={japaneseTopStoryDetail.score}
            id={japaneseTopStoryDetail.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Allpage;
