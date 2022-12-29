import * as deepl from "deepl-node";
import { translateResultToStory } from "./translateResult";

export const translateStoryDetail = async (storyDetail, language) => {
  const translator = new deepl.Translator(process.env.DEEPL_AUTH_KEY);
  const translatedResponse = await translator.translateText(
    storyDetail.title,
    null,
    language
  );

  return translateResultToStory(storyDetail, translatedResponse);
};
