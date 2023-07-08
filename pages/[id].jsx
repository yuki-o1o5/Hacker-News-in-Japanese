import DetailArticleCategoryTitle from "../components/DetailArticleCategoryTitle/DetailArticleCategoryTitle.jsx";
import DetailArticleTitle from "../components/DetailArticleTitle/DetailArticleTitle.jsx";
import DetailArticleUrl from "../components/DetailArticleUrl/DetailArticleUrl.jsx";
import PageTitle from "../components/PageTitle/PageTitle.jsx";
import { getStoryDetail } from "../helpers/hackerNews/storyDetail.js";
import { getCommentDetail } from "../helpers/hackerNews/commentDetail.js";
import { translateStoryDetail } from "../helpers/deepl/translateStoryDetail.js";
import { translateCommentDetail } from "../helpers/deepl/translateCommentDetail.js";
import { JA } from "../constants/deepl.js";
import styles from "./index.module.css";

export async function getStaticProps({ params }) {
  const storyId = params.id;
  const storyDetail = await getStoryDetail(storyId);

  const firstCommentDetail = storyDetail.kids?.length
    ? await getCommentDetail(storyDetail.kids[0])
    : "";

  let firstCommentReplies = [];
  if (firstCommentDetail.kids) {
    firstCommentReplies = await Promise.all(
      firstCommentDetail.kids.map((firstCommentDetailKid) =>
        getCommentDetail(firstCommentDetailKid)
      )
    );
  }

  try {
    const japaneseStoryDetail = await translateStoryDetail(storyDetail, JA);

    const japaneseFirstCommentDetail = firstCommentDetail
      ? await translateCommentDetail(firstCommentDetail, JA)
      : {};

    let japaneseFirstCommentReplies = [];
    if (firstCommentReplies) {
      japaneseFirstCommentReplies = await Promise.all(
        firstCommentReplies.map((fisrtCommentReply) =>
          translateCommentDetail(fisrtCommentReply, JA)
        )
      );
    }

    return {
      props: {
        japaneseStoryDetail,
        japaneseFirstCommentDetail,
        japaneseFirstCommentReplies,
      },
      revalidate: 60 * 60, // Regenerate the page every hour
    };
  } catch (e) {
    return {
      props: {
        japaneseStoryDetail: {},
        japaneseFirstCommentDetail: {},
        japaneseFirstCommentReplies: [],
      },
      revalidate: 60 * 60,
    };
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
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
        {japaneseStoryDetail.url && (
          <div className="detail_article_title_container">
            <DetailArticleTitle
              detailArticleTitle={japaneseStoryDetail.title}
            />
          </div>
        )}
        <div className="article_text_container">
          {japaneseStoryDetail.url && (
            <DetailArticleCategoryTitle
              detailArticleCategoryTitle={"Story URL"}
            />
          )}
          {japaneseStoryDetail.url && (
            <div className="main_text-container">
              <DetailArticleUrl detailArticleUrl={japaneseStoryDetail.url} />
            </div>
          )}
        </div>
        {japaneseFirstCommentDetail && (
          <>
            <DetailArticleCategoryTitle
              detailArticleCategoryTitle={"Top Comment"}
            />
            <div className="secondry_text-container">
              <div
                className={styles.detailArticleCommentParent}
                dangerouslySetInnerHTML={{
                  __html: japaneseFirstCommentDetail.text,
                }}
              />
              {japaneseFirstCommentReplies.length > 0 && (
                <>
                  <DetailArticleCategoryTitle
                    detailArticleCategoryTitle={"Replies to Top Comment"}
                  />
                  {japaneseFirstCommentReplies.map((rep) => (
                    <div 
                      key={rep.id}
                      className={styles.detailArticleCommentChild}
                      dangerouslySetInnerHTML={{ __html: rep.text }}
                    />
                  ))}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailPage;
