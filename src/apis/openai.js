import OpenAI from "openai";

const API_KEY = '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';

const openai = new OpenAI({ apiKey: API_KEY , dangerouslyAllowBrowser: true });
const actions = {
    1: "Explicame lo siguiente para que lo pueda entender incluso un niño de 10 años:\n\n",
    2: "Explicame con vocabulario mas familiar para la gente común:\n\n",
    3: "Resumeme los puntos principales de este texto:\n\n",
};

async function chat(text, grado) {
  const completion1 = await openai.chat.completions.create({
    messages: [{ role: "system", content: actions[grado] + text }],
    model: "gpt-3.5-turbo",
  });

  return completion1.choices[0].message.content
}

export default chat;