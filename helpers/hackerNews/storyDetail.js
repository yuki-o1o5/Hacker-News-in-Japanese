export const getStoryDetail = async (id) => {
  let storyDetail = {};
  try {
    const getStoryDetailRes = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
    );

    if (!getStoryDetailRes.ok) {
      return {
        notFound: true,
      };
    }
    storyDetail = await getStoryDetailRes.json();
    return storyDetail;
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
