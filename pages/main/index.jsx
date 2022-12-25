import * as deepl from "deepl-node";
import Article from "../../components/Article/Article.jsx";
import ArticlesCategoryTitle from "../../components/ArticlesCategoryTitle/ArticlesCategoryTitle.jsx";
import PageDescription from "../../components/PageDescription/PageDescription.jsx";
import PageTitle from "../../components/PageTitle/PageTitle.jsx";

export async function getStaticProps() {
  // 1.This is top 3 story ids.
  let topStoriesIds = [];
  try {
    const getTopStoriesIdsRes = await fetch(
      `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty&limitToFirst=3&orderBy="$key"`
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

const Mainpage = (props) => {
  return (
    <div>
      <PageTitle />
      <div className={"main_container"}>
        <ArticlesCategoryTitle articlesCategoryTitle={"Recent in Hour"} />

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
