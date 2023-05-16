import * as deepl from "deepl-node";

export const translateCommentDetail = async (commentDetail, language) => {
  const translator = new deepl.Translator(process.env.DEEPL_AUTH_KEY);

  const translatedResponse = commentDetail.text
    ? await translator.translateText(commentDetail.text, null, language)
    : { text: "" };

  return {
    by: commentDetail.by || "",
    id: commentDetail.id || 0,
    kids: commentDetail.kids || [],
    parent: commentDetail.parent || 0,
    text: translatedResponse.text || "",
    time: commentDetail.id || 0,
    type: commentDetail.type || "",
  };
};
