export const askAI = async (messages) => {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const model = import.meta.env.VITE_GEMINI_MODEL || 'gemini-2.0-flash';

  if (!API_KEY) {
    throw new Error('Missing VITE_GEMINI_API_KEY environment variable');
  }

  const contents = messages
    .filter((message) => message.role !== 'system')
    .map((message) => ({
      role: message.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: message.content }],
    }));

  const API_URL =
    `https://generativelanguage.googleapis.com/v1beta/models/${model}` +
    `:generateContent?key=${encodeURIComponent(API_KEY)}`;

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ contents }),
  });

  const data = await response.json();

  if (!response.ok) {
    const apiMessage =
      data.error?.message || `Gemini request failed with status ${response.status}`;
    throw new Error(apiMessage);
  }

  return (
    data.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || '')
      .join('')
      .trim() || 'No response received.'
  );
};