const fetch = require('node-fetch');

const OPENROUTER_API_KEY = "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";

async function performWebSearch(query) {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "perplexity/llama-3.1-sonar-large-128k-online",
        "messages": [
          {"role": "system", "content": "You are a helpful AI assistant with access to the latest online information (Prioritize Indonesian topic, or maybe other countries depend query). Provide detailed and up-to-date information based on the user's query."},
          {"role": "user", "content": query},
        ],
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error performing web search:", error);
    return "Error: Unable to perform web search.";
  }
}

module.exports = { performWebSearch };