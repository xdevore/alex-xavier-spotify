import OpenAI from "openai";


const openai = new OpenAI({ apiKey: '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',
dangerouslyAllowBrowser: true });

const getSummary = async (genres) => {
    console.log("help me pleeeease")
  try {
    //const prompt = `resturn ONLY a comma seperated sublist of List: ${genres.join(', ')} that are genres that fit well with this promp: "songs to play at a college party".`;
    const prompt = `Make a short and concise sentence describing the main 3 or 4 genres with a short description of what this music style says about your daily listening. Be very brief! List: ${genres.join(', ')}. Start with your daily Genre style encompases`;

    const response = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-3.5-turbo",
      max_tokens: 150
    });

 
    return response.choices[0].message.content.trim();
  } catch (error) {
    return "Error generating summary.";
  }
}

export { getSummary };