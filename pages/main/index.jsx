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
      descendants: text.descendants,
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

const Mainpage = (props) => {
  return (
    <div>
      <PageTitle />
      <div className={"main_container"}>
        <ArticlesCategoryTitle articlesCategoryTitle={"Recent in Hour"} />

        {props.japaneseStories.map((japaneseStory, i) => (
          <Article
            key={`japaneseStory-list-${i}`}
            id={japaneseStory.id}
            articleTitle={japaneseStory.title}
            articleNumber={i + 1}
            articleAuthor={japaneseStory.by}
            articleTime={japaneseStory.time}
            articlePoints={japaneseStory.score}
          />
        ))}

        <PageDescription />
      </div>
    </div>
  );
};

export default Mainpage;
