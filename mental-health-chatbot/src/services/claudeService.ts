import axios from 'axios';

const CLAUDE_API_KEY = process.env.REACT_APP_CLAUDE_API_KEY;
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

interface ClaudeMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ClaudeResponse {
  content: string;
  role: string;
}

export const generateMoodContent = async (mood: string): Promise<any> => {
  try {
    const prompt = `As an Islamic counselor, provide guidance for someone feeling ${mood}. Include:
    1. Relevant Quranic verses
    2. Related Hadiths
    3. Appropriate duas
    4. Practical suggestions based on Islamic teachings
    Format the response as a JSON object with these categories.`;

    const response = await axios.post(
      CLAUDE_API_URL,
      {
        model: 'claude-3-sonnet-20240229',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 1000,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error generating mood content:', error);
    throw error;
  }
};

export const getChatbotResponse = async (messages: ClaudeMessage[]): Promise<string> => {
  try {
    const response = await axios.post(
      CLAUDE_API_URL,
      {
        model: 'claude-3-sonnet-20240229',
        messages: [
          {
            role: 'system',
            content: `You are an Islamic counselor providing guidance based on Quran and Hadith. 
            Your responses should be empathetic, practical, and rooted in Islamic teachings. 
            Always maintain a supportive and encouraging tone while addressing the user's concerns.`,
          },
          ...messages,
        ],
        max_tokens: 1000,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01',
        },
      }
    );

    return response.data.content[0].text;
  } catch (error) {
    console.error('Error getting chatbot response:', error);
    throw error;
  }
}; 