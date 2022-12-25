export const textResultToStory = (textResult, japaneseTextResult) => {
  return {
    by: textResult.by || "",
    descendants: textResult.descendants || 0,
    id: textResult.id || 0,
    kids: textResult.kids || [],
    score: textResult.score || 0,
    time: textResult.time || 0,
    title: japaneseTextResult.title || 0,
    type: textResult.type || "",
    url: textResult.url || "",
  };
};

export const textResultToComment = (textResult, japaneseTextResult) => {
  return {
    by: textResult.by || "",
    id: textResult.id || 0,
    kids: textResult.kids || [],
    parent: textResult.parent || 0,
    text: japaneseTextResult.text || "",
    time: textResult.id || 0,
    type: textResult.type || "",
  };
};
