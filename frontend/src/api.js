import axios from "axios";

const API_URL = "http://localhost:5054/api";

export const runCode = async (code, language, userInput) => {
  try {
    const response = await axios.post(`${API_URL}/execute`, {
      code,
      language,
      input: userInput
    });

    return response.data.output;
  } catch (error) {
    console.error("Error executing code:", error);
    return "Execution error!";
  }
};
