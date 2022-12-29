export const getCommentDetail = async (commentId) => {
  let commentDetail = {};
  try {
    const getCommentDetailRes = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`
    );
    if (!getCommentDetailRes.ok) {
      return {
        notFound: true,
        revalidate: 10,
      };
    }
    commentDetail = await getCommentDetailRes.json();
    return commentDetail;
  } catch (error) {
    return {
      notFound: true,
      revalidate: 10,
    };
  }
};
