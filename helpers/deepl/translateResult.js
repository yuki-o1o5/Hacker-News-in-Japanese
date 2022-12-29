export const translateResultToStory = (storyDetail, translatedStoryDetail) => {
  return {
    by: storyDetail.by || "",
    descendants: storyDetail.descendants || 0,
    id: storyDetail.id || 0,
    kids: storyDetail.kids || [],
    score: storyDetail.score || 0,
    time: storyDetail.time || 0,
    title: translatedStoryDetail.text || "",
    type: storyDetail.type || "",
    url: storyDetail.url || "",
  };
};

export const translateResultToComment = (
  commentDetail,
  translatedcommentDetail
) => {
  return {
    by: commentDetail.by || "",
    id: commentDetail.id || 0,
    kids: commentDetail.kids || [],
    parent: commentDetail.parent || 0,
    text: translatedcommentDetail.text || "",
    time: commentDetail.id || 0,
    type: commentDetail.type || "",
  };
};
