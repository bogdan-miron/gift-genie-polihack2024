import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? '');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export async function generateGiftSuggestions(
  answers: Record<string, string[]>
) {
  const prompt = `I need gift suggestions for someone with these characteristics:
    ${Object.entries(answers)
      .map(([question, answer]) => `${question}: ${answer.join(', ')}`)
      .join('\n')}
    
    Please generate maximum 6 comma-separated non-repeating gift categories that would be suitable.
    These should be general categories (like those found on Wikipedia), not specific items.`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('AI generation error:', error);
    return null;
  }
}
