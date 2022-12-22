import PageTitle from "../../components/PageTitle/PageTitle.jsx";
import TableHeader from "../../components/TableHeader/TableHeader.jsx";
import DayTitleAndPoints from "../../components/DayTitleAndPoints/DayTitleAndPoints.jsx";

export async function getStaticProps() {
  // 1.This is top 3 story ids.
  const res = await fetch(
    `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty&limitToFirst=10&orderBy="$key"`
  );
  const topstories = await res.json();

  // 2.This is each story details.
  const getDetailUrl = async (id) => {
    const res = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
    );
    const eachStoryDetails = await res.json();
    return eachStoryDetails;
  };

  const stories = await Promise.all(
    topstories.map((topstory) => getDetailUrl(topstory))
  );

  //  3.This is each Japanese story details
  const translateToJapanese = async (text) => {
    const deepl = require("deepl-node");
    const authKey = process.env.DEEPL_AUTH_KEY;
    const translator = new deepl.Translator(authKey);

    const translatedResponse = await translator.translateText(
      text.title,
      null,
      "ja"
    );

    console.log(translatedResponse.text);

    return {
      by: text.by,
      descendants: text.descendants || [],
      id: text.id,
      kids: text.kids || [],
      score: text.score,
      time: text.time,
      title: translatedResponse.text,
      type: text.type,
      url: text.url,
    };
  };

  const japaneseStories = await Promise.all(
    stories.map((story) => translateToJapanese(story))
  );

  return {
    props: { japaneseStories },
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
        {props.japaneseStories.map((japaneseStory, i) => (
          <DayTitleAndPoints
            key={`japaneseStory-list-${i}`}
            dayTitle={japaneseStory.title}
            dayPoints={japaneseStory.score}
            id={japaneseStory.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Allpage;
