import DetailArticleCategoryTitle from "../../components/DetailArticleCategoryTitle/DetailArticleCategoryTitle.jsx";
import DetailArticleCommentChild from "../../components/DetailArticleCommentChild/DetailArticleCommentChild.jsx";
import DetailArticleCommentParent from "../../components/DetailArticleCommentParent/DetailArticleCommentParent.jsx";
import DetailArticleTitle from "../../components/DetailArticleTitle/DetailArticleTitle.jsx";
import DetailArticleUrl from "../../components/DetailArticleUrl/DetailArticleUrl.jsx";
import PageTitle from "../../components/PageTitle/PageTitle.jsx";
import { getStoryDetail } from "../../helpers/hackerNews/storyDetail";
import { getCommentDetail } from "../../helpers/hackerNews/commentDetail";
import { translateStoryDetail } from "../../helpers/deepl/translateStoryDetail";
import { translateCommentDetail } from "../../helpers/deepl/translateCommentDetail";
import { JA } from "../../helpers/deepl/common";

export async function getServerSideProps(context) {
  const storyId = context.query.id;
  // console.log(storyId);

  const storyDetail = await getStoryDetail(storyId);
  // console.log(storyDetail);

  const firstCommentDetail = storyDetail.kids
    ? await getCommentDetail(storyDetail.kids[0])
    : "";
  // console.log("firstCommentDetail", firstCommentDetail);

  let firstCommentReplies = [];
  if (firstCommentDetail.kids) {
    firstCommentReplies = await Promise.all(
      firstCommentDetail.kids.map((firstCommentDetailKid) =>
        getCommentDetail(firstCommentDetailKid)
      )
    );
  }

  const japaneseStoryDetail = await translateStoryDetail(storyDetail, JA);
  // console.log(japaneseStoryDetail);

  const japaneseFirstCommentDetail = firstCommentDetail
    ? await translateCommentDetail(firstCommentDetail, JA)
    : {};
  // console.log(japaneseFirstCommentDetail);

  let japaneseFirstCommentReplies = [];
  if (firstCommentReplies) {
    japaneseFirstCommentReplies = await Promise.all(
      firstCommentReplies.map((fisrtCommentReply) =>
        translateCommentDetail(fisrtCommentReply, JA)
      )
    );
  }
  // console.log(japaneseFirstCommentReplies);

  return {
    props: {
      japaneseStoryDetail,
      japaneseFirstCommentDetail,
      japaneseFirstCommentReplies,
    },
  };
}

const DetailPage = ({
  japaneseStoryDetail,
  japaneseFirstCommentDetail,
  japaneseFirstCommentReplies,
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
            detailArticleCategoryTitle={"Story URL"}
          />
          <div className="main_text-container">
            <DetailArticleUrl DetailArticleUrl={japaneseStoryDetail.url} />
          </div>
        </div>
        <div className="article_text_container">
          <DetailArticleCategoryTitle
            detailArticleCategoryTitle={"Top Comment & Replies"}
          />
          <div className="secondry_text-container">
            <DetailArticleCommentParent
              detailArticleCommentParent={japaneseFirstCommentDetail.text}
            />
            {japaneseFirstCommentReplies.map((japaneseFirstCommentReply) => (
              <DetailArticleCommentChild
                detailArticleCommentChild={japaneseFirstCommentReply.text}
                key={`story-list-${japaneseFirstCommentReply.id}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
