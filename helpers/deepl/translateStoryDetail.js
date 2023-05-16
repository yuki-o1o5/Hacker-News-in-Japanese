import * as deepl from "deepl-node";

export const translateStoryDetail = async (storyDetail, language) => {
  const translator = new deepl.Translator(process.env.DEEPL_AUTH_KEY);
  const translatedTitle = storyDetail.title
    ? await translator.translateText(storyDetail.title, null, language)
    : { text: "" };

  return {
    by: storyDetail.by || "",
    descendants: storyDetail.descendants || 0,
    id: storyDetail.id || 0,
    kids: storyDetail.kids || [],
    score: storyDetail.score || 0,
    time: storyDetail.time || 0,
    title: translatedTitle.text,
    type: storyDetail.type || "",
    url: storyDetail.url || "",
  };
};
