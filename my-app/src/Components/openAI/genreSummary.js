import OpenAI from "openai";


const openai = new OpenAI({ apiKey: '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',
dangerouslyAllowBrowser: true });

const getSummary = async (genres) => {
    console.log("help me pleeeease")
  try {
    
    const prompt = `Make a short and concise sentence describing the main 3 or 4 genres with a short description of what this music style says about your daily listening. Be very brief! List: ${genres.join(', ')}. Start with your daily Genre style encompases`;

    const response = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-3.5-turbo",
      max_tokens: 150
    });

    // Ensure you're accessing the response correctly:
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating summary:', error);
    return "Error generating summary.";
  }
}

export { getSummary };