import * as deepl from "deepl-node";
import DetailArticleCategoryTitle from "../../components/DetailArticleCategoryTitle/DetailArticleCategoryTitle.jsx";
import DetailArticleCommentChild from "../../components/DetailArticleCommentChild/DetailArticleCommentChild.jsx";
import DetailArticleCommentParent from "../../components/DetailArticleCommentParent/DetailArticleCommentParent.jsx";
import DetailArticleText from "../../components/DetailArticleText/DetailArticleText.jsx";
import DetailArticleTitle from "../../components/DetailArticleTitle/DetailArticleTitle.jsx";
import PageTitle from "../../components/PageTitle/PageTitle.jsx";
import { textResultToStory } from "../../helpers/deepl";
import { textResultToComment } from "../../helpers/deepl";

export async function getStaticProps(context) {
  // 1.This is an id. ->[33935566]
  const storyId = context.params.id;
  // console.log("params", context.params);

  // 2.This is a story detail. ->{...}
  const getStoryUrl = async (id) => {
    let story = {};
    try {
      const getStoryRes = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
      );

      if (!getStoryRes.ok) {
        return {
          notFound: true,
          revalidate: 10,
        };
      }
      story = await getStoryRes.json();
      return story;
    } catch (error) {
      return {
        notFound: true,
        revalidate: 10,
      };
    }
  };
  const storyDetail = await getStoryUrl(storyId);
  // console.log(storyDetail);

  // 3.This is the top comment.
  const getCommentUrl = async (commentId) => {
    let comment = {};
    try {
      const getCommentRes = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`
      );
      if (!getCommentRes.ok) {
        return {
          notFound: true,
          revalidate: 10,
        };
      }
      comment = await getCommentRes.json();
      return comment;
    } catch (error) {
      return {
        notFound: true,
        revalidate: 10,
      };
    }
  };

  const topComment = storyDetail.kids
    ? await getCommentUrl(storyDetail.kids[0])
    : "";
  // console.log("topComment", topComment);

  // 4.This is the comments of the top comment .
  let topCommentReplies = [];
  if (topComment.kids) {
    topCommentReplies = await Promise.all(
      topComment.kids.map((topCommentKid) => getCommentUrl(topCommentKid))
    );
  }

  // 5. This is Japanese title
  const translateToJapaneseTitle = async (text) => {
    const translator = new deepl.Translator(process.env.DEEPL_AUTH_KEY);
    const translatedResponse = await translator.translateText(
      text.title,
      null,
      "ja"
    );
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
    // return textResultToStory(text, translatedResponse);
  };

  const japaneseStoryDetail = await translateToJapaneseTitle(storyDetail);
  console.log(japaneseStoryDetail);

  const translateToJapaneseTopComment = async (text) => {
    const translator = new deepl.Translator(process.env.DEEPL_AUTH_KEY);
    const translatedResponse = await translator.translateText(
      text.text,
      null,
      "ja"
    );

    // return {
    //   by: text.by || "",
    //   id: text.id || 0,
    //   kids: text.kids || [],
    //   parent: text.parent || 0,
    //   text: translatedResponse.text || "",
    //   time: text.id || 0,
    //   type: text.type || "",
    // };
    return textResultToComment(text, translatedResponse);
  };

  const japaneseTopComment = topComment
    ? await translateToJapaneseTopComment(topComment)
    : "";

  // console.log(japaneseTopComment);

  // const japaneseTopCommentReplies = topCommentReplies
  //   ? await Promise.all(
  //       topCommentReplies.map((topCommentReply) =>
  //         translateToJapaneseTopComment(topCommentReply)
  //       )
  //     )
  //   : "";

  let japaneseTopCommentReplies = [];
  if (topCommentReplies) {
    japaneseTopCommentReplies = await Promise.all(
      topCommentReplies.map((topCommentReply) =>
        translateToJapaneseTopComment(topCommentReply)
      )
    );
  }
  // console.log(japaneseTopCommentReplies);

  return {
    props: {
      japaneseStoryDetail,
      japaneseTopComment,
      japaneseTopCommentReplies,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  // 1.This is top 3 story ids.
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

  const paths = topStoriesIds.map((topStoriesId) => ({
    params: { id: topStoriesId.toString() },
  }));
  // console.log(paths);
  return {
    paths,
    fallback: false,
  };
}

const DetailPage = ({
  japaneseStoryDetail,
  japaneseTopComment,
  japaneseTopCommentReplies,
}) => {
  return (
    <div>
      <PageTitle />
      <div className={"main_container"}>
        <div className="detail_article_title_container">
          <DetailArticleTitle detailArticleTitle={japaneseStoryDetail.title} />
        </div>
        <div className="article_text_container">
          <DetailArticleCategoryTitle
            detailArticleCategoryTitle={"Article Summary"}
          />
          <div className="main_text-container">
            <DetailArticleText
              detailArticleText={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempor nec feugiat nisl pretium. Purus non enim praesent elementum facilisis. Ultrices sagittis orci a scelerisque purus semper eget duis. At lectus urna duis convallis convallis tellus. Gravida in fermentum et sollicitudin ac orci phasellus egestas. Ut sem nulla pharetra diam sit. Id donec ultrices tincidunt."
              }
            />
          </div>
        </div>
        <div className="article_text_container">
          <DetailArticleCategoryTitle
            detailArticleCategoryTitle={"Top Comment"}
          />
          <div className="secondry_text-container">
            <DetailArticleCommentParent
              detailArticleCommentParent={japaneseTopComment.text}
            />
            {japaneseTopCommentReplies.map((japaneseTopCommentReply) => (
              <DetailArticleCommentChild
                detailArticleCommentChild={japaneseTopCommentReply.text}
                key={`story-list-${japaneseTopCommentReply.id}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
