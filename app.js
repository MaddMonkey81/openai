require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
//console.log(process.env.OPENAI_API_KEY);

async function main(QA) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: QA,
      temperature: 0,
      max_tokens: 2000,
    });
    //console.log(response.data.choices[0].text);
    return response.data.choices[0].text;
  } catch (error) {
    if (error.response) {
      console.log(error.response.status, error.response.data);
    } else {
      console.log(`Error with OpenAI API request: ${error.message}`);
    }
  }
}

module.exports = main; 
