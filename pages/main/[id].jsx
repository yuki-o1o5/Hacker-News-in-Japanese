import { useRouter } from "next/router.js";
import DetailArticleCategoryTitle from "../../components/DetailArticleCategoryTitle/DetailArticleCategoryTitle.jsx";
import DetailArticleCommentChild from "../../components/DetailArticleCommentChild/DetailArticleCommentChild.jsx";
import DetailArticleCommentParent from "../../components/DetailArticleCommentParent/DetailArticleCommentParent.jsx";
import DetailArticleText from "../../components/DetailArticleText/DetailArticleText.jsx";
import DetailArticleTitle from "../../components/DetailArticleTitle/DetailArticleTitle.jsx";
import PageTitle from "../../components/PageTitle/PageTitle.jsx";

export async function getStaticProps(context) {
  // 1.This is an id. ->[33935566]
  const storyId = context.params.id;
  // console.log("params", context.params);

  // 2.This is a story detail. ->{...}
  const getDetailUrl = async (id) => {
    const res = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
    );
    const eachStoryDetails = await res.json();
    return eachStoryDetails;
  };
  const story = await getDetailUrl(storyId);

  // 3.This is the top comment.
  const getCommentUrl = async (commentId) => {
    const res = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`
    );
    const comments = await res.json();
    return comments;
  };

  // const topComment = story.kids ? await getCommentUrl(story.kids[0]) : "";
  const topComment = story.kids ? await getCommentUrl(story.kids[0]) : "";

  // console.log("topComment", topComment);

  // 3.This is the comments of the top comment .
  let topCommentReplies = [];
  if (topComment.kids) {
    topCommentReplies = await Promise.all(
      topComment.kids.map((topCommentKid) => getCommentUrl(topCommentKid))
    );
  }
  // console.log("topCommentReplies", topCommentReplies);

  // 4. This is Japanese title
  const translateToJapaneseTitle = async (text) => {
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

  const japaneseStory = await translateToJapaneseTitle(story);

  const translateToJapaneseTopComment = async (text) => {
    const deepl = require("deepl-node");
    const authKey = process.env.DEEPL_AUTH_KEY;
    const translator = new deepl.Translator(authKey);
    const translatedResponse = await translator.translateText(
      text.text,
      null,
      "ja"
    );
    console.log(translatedResponse.text);
    return {
      by: text.by,
      id: text.id,
      kids: text.kids || [],
      parent: text.parent,
      text: translatedResponse.text,
      time: text.id,
      type: text.type,
    };
  };

  const japaneseTopComment = topComment
    ? await translateToJapaneseTopComment(topComment)
    : "";

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

  return {
    props: { japaneseStory, japaneseTopComment, japaneseTopCommentReplies },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  // 1.This is top 3 story ids.
  const res = await fetch(
    `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty&limitToFirst=3&orderBy="$key"`
  );
  const topstories = await res.json();

  const paths = topstories.map((topstory) => ({
    params: { id: topstory.toString() },
  }));
  console.log(paths);
  return {
    paths,
    fallback: false,
  };
}

const DetailPage = ({
  japaneseStory,
  japaneseTopComment,
  japaneseTopCommentReplies,
}) => {
  // console.log(story);
  return (
    <div>
      <PageTitle />
      <div className={"main_container"}>
        <div className="detail_article_title_container">
          <DetailArticleTitle detailArticleTitle={japaneseStory.title} />
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
            {japaneseTopCommentReplies.map((japaneseTopCommentReply, i) => (
              <DetailArticleCommentChild
                detailArticleCommentChild={japaneseTopCommentReply.text}
                key={`story-list-${i}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
