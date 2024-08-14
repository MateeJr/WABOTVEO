const fetch = require('node-fetch');
const OPENROUTER_API_KEY = "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";

async function getWeatherInfo(query) {
  try {
    const defaultQuery = "What's the weather like today in Medan, Indonesia? Provide detailed information including temperature, humidity, wind speed, and any notable weather conditions.";
    const fullQuery = query ? `${query}. ${defaultQuery}` : defaultQuery;

    // Get current date and time
    const now = new Date();
    const currentDateTime = now.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "perplexity/llama-3.1-sonar-large-128k-online",
        "messages": [
          {
            "role": "system",
            "content": `You are a helpful AI assistant with access to the latest online weather information. Provide detailed and up-to-date weather information based on the user's query. If the query doesn't specify a location or date, use Medan, Indonesia and today's date as defaults. Focus on accuracy and relevance. The current date and time is: ${currentDateTime} (Asia/Jakarta time zone).`
          },
          {
            "role": "user",
            "content": fullQuery
          },
        ],
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching weather information:", error);
    return "Error: Unable to fetch weather information.";
  }
}

module.exports = {
  getWeatherInfo
};