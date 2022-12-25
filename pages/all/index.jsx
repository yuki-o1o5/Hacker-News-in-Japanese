import * as deepl from "deepl-node";
import PageTitle from "../../components/PageTitle/PageTitle.jsx";
import TableHeader from "../../components/TableHeader/TableHeader.jsx";
import DayTitleAndPoints from "../../components/DayTitleAndPoints/DayTitleAndPoints.jsx";

export async function getStaticProps() {
  // 1.This is top 10 story ids.
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

  // 2.This is each story details.
  const getTopStoriesUrl = async (id) => {
    let topStories = [];
    try {
      const getTopStoriesRes = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
      );

      if (!getTopStoriesRes.ok) {
        return {
          notFound: true,
          revalidate: 10,
        };
      }

      topStories = await getTopStoriesRes.json();
      return topStories;
    } catch (error) {
      return {
        notFound: true,
        revalidate: 10,
      };
    }
  };
  const topStoriesDetails = await Promise.all(
    topStoriesIds.map((topStoriesId) => getTopStoriesUrl(topStoriesId))
  );

  //  3.This is each Japanese story details
  const translateToJapanese = async (text) => {
    const translator = new deepl.Translator(process.env.DEEPL_AUTH_KEY);
    const translatedResponse = await translator.translateText(
      text.title,
      null,
      "ja"
    );
    // console.log(translatedResponse.text);
    return {
      by: text.by || "",
      descendants: text.descendants || 0,
      id: text.id || 0,
      kids: text.kids || [],
      score: text.score || 0,
      time: text.time || 0,
      title: translatedResponse.text || 0,
      type: text.type || "",
      url: text.url || "",
    };
  };

  const japaneseTopStories = await Promise.all(
    topStoriesDetails.map((topStoriesDetail) =>
      translateToJapanese(topStoriesDetail)
    )
  );

  return {
    props: { japaneseTopStories },
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
        {props.japaneseTopStories.map((japaneseTopStory) => (
          <DayTitleAndPoints
            key={`japaneseStory-list-${japaneseTopStory.id}`}
            dayTitle={japaneseTopStory.title}
            dayPoints={japaneseTopStory.score}
            id={japaneseTopStory.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Allpage;
