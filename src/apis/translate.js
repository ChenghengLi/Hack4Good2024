import translate from "translate";

translate.engine = "google"; 

async function translateText(text, language = "en") {
  const translatedText = await translate(text, {from:"es", to: language });
  return translatedText;
};

export default translateText;