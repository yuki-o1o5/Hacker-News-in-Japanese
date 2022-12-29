import * as deepl from "deepl-node";
import { translateResultToComment } from "./translateResult";

export const translateCommentDetail = async (commentDetail, language) => {
  const translator = new deepl.Translator(process.env.DEEPL_AUTH_KEY);
  const translatedResponse = await translator.translateText(
    commentDetail.text,
    null,
    language
  );

  return translateResultToComment(commentDetail, translatedResponse);
};
