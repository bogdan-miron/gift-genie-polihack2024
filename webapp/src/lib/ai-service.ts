import { GoogleGenerativeAI } from '@google/generative-ai';
import { Question, useGiftFinderStore } from './store';

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

export async function generateNextQuestion(questions: Question[],setQuestions: (questions: Question[]) => void) {
  let prompt = `I have to buy a present for the following person with these characteristics
      ${questions.map((ans) => ans.question + " " + ans.choices.map(choice => choice.title).join(',') + ",")}.
       Please provide a question to narrow down the search space of gifts that would be
        suitable for this person, without repeating any of the characteristics and areas of interest for that person, or any category already found in the list. 
      Please also generate only maximum 6 comma-separated non-repeating subcategories of the specified
       categories for possible answers, without anymore output.It cannot be a specific object,
        it can only be a category listed on wikipedia`;

  console.log("PROMPT:",prompt);

  const generatedAnswer = await model.generateContent(prompt);
  console.log("Raspuns:",generatedAnswer.response.text())

  let stringResponse = generatedAnswer.response.text()
  let arr = stringResponse.split(",");
  let newQuestion = arr[0];
  console.log("Arr:",arr)
  console.log("new:",newQuestion)
  let possibleAnswers = arr.shift();



  //setQuestions((prev)=> [...prev, ])

  // console.log("Generated answear",generatedAnswer.response.text())

  // let entry: Answer = {
  //     question: newQuestion,
  //     answer: possibleAnswers.join(","),
  // };

  // setStartingAnswers((prev) => [...prev, entry]);
  // console.log("ALL:",startingAnswers);
  
}

