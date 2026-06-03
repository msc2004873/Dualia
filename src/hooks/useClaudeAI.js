import { useState } from 'react';

export const useClaudeAI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const callClaude = async (prompt, parseJSON = false) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{ role: 'user', content: prompt }],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'API request failed');
      }

      const data = await response.json();
      const text = data.content[0].text;

      if (parseJSON) {
        try {
          const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
          const parsed = JSON.parse(cleanedText);
          setResult(parsed);
        } catch (parseError) {
          setError('Unable to parse AI response. Please try again.');
          setResult(null);
        }
      } else {
        setResult(text);
      }
    } catch (err) {
      setError(err.message || 'Unable to generate recommendation. Please try again.');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setLoading(false);
    setError(null);
    setResult(null);
  };

  return { loading, error, result, callClaude, reset };
};
