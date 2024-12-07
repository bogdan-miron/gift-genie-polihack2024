import { GoogleGenerativeAI } from '@google/generative-ai';
import { Question, TextQuestion } from './store';

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? ''
);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export async function generateGiftSuggestions(
  answers: Record<string, string[]>,
  questions: Question[]
) {
  // Create a mapping of question IDs to their full questions
  const questionMap = questions.reduce((acc, q) => {
    acc[q.id] = q;
    return acc;
  }, {} as Record<string, Question>);

  // Build a more detailed prompt with questions and answers
  const prompt = `I need gift suggestions for someone with these characteristics:
    ${Object.entries(answers)
      .map(([questionId, selectedIds]) => {
        const question = questionMap[questionId];
        const selectedTitles = selectedIds
          .map(
            (id) => question.choices.find((choice) => choice.id === id)?.title
          )
          .filter(Boolean);

        return `${question.question} ${selectedTitles.join(', ')}`;
      })
      .join('\n')}
    
    Please generate maximum 6 comma-separated non-repeating gift categories that would be suitable.
    These should be general categories (like those found on Wikipedia), not specific items.`;

  try {
    console.log('AI Prompt:', prompt);
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('AI generation error:', error);
    return null;
  }
}

export async function generateNextQuestion(
  questions: Question[],
  answers: Record<string, string[]>,
  setQuestions: (questions: Question[]) => void
) {
  const prompt = `I have to buy a present for the following person with these characteristics:
      ${questions.map((q) => {
        const selectedAnswers = answers[q.id] || [];
        const selectedTitles = selectedAnswers
          .map((id) => q.choices.find((choice) => choice.id === id)?.title)
          .filter(Boolean);

        return `${q.question} ${selectedTitles.join(', ')}`;
      })}.
       Please provide a question to narrow down the search space of gifts that would be
        suitable for this person, without repeating any of the characteristics and areas of interest for that person, or any category already found in the list. 
      Please also generate only maximum 6 comma-separated non-repeating subcategories of the specified
       categories for possible answers, without anymore output. It cannot be a specific object,
        it can only be a category listed on wikipedia`;

  try {
    console.log('Generating new question, prompt:', prompt);
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    console.log('AI response:', response);

    const responseText = response.trim();
    const arr = responseText.split(',');
    const questionText = arr[0];
    const options = arr.slice(1).map((opt) => opt.trim());

    // Create new question object
    const newQuestion: TextQuestion = {
      id: `generated-${questions.length + 1}`,
      type: 'text',
      question: questionText,
      multiSelect: false,
      choices: options!.map((title, index) => ({
        id: `gen-${questions.length + 1}-${index + 1}`,
        title,
      })),
    };

    // Update questions array
    setQuestions([...questions, newQuestion]);

    return newQuestion;
  } catch (error) {
    console.error('Failed to generate next question:', error);
    throw error;
  }
}
