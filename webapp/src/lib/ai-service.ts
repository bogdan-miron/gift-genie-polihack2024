import { GoogleGenerativeAI } from "@google/generative-ai";
import { Question, TextQuestion } from "./store";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateGiftSuggestions(
    answers: Record<string, string[]>,
    questions: Question[]
) {
    const prompt = `The user has selected
        ${questions.map((q) => {
            const selectedAnswers = answers[q.id] || [];
            const selectedTitles = selectedAnswers
                .map((id) => q.choices.find((choice) => choice.id === id)?.title)
                .filter(Boolean);

            return `${q.question} ${selectedTitles.join(", ")}.
            from your previous suggestions. Please suggest 5 gifts for this person separated by commas. Generate only the specific object, no other words and no examples`;
        })}`;
    try {
        console.log("AI Prompt:", prompt);
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.error("AI generation error:", error);
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

            return `${q.question} ${selectedTitles.join(", ")}`;
        })}.
        Please provide a question to narrow down the search space of gifts that would be
            suitable for this person, without repeating any of the characteristics and areas of interest for that person, or any category already found in the list. 
        Please also generate only maximum 6 comma-separated non-repeating subcategories of the specified
        categories for possible answers, without anymore output. It cannot be a specific object,
            it can only be a category listed on wikipedia. ONLY PUT COMMAS BETWEEN THE OPTIONS without "or" or "and", and a comma between the question and the options. I do not want a question mark at the end.`;

    try {
        console.log("Generating new question, prompt:", prompt);
        const result = await model.generateContent(prompt);
        const response = result.response.text();
        console.log("AI response:", response);

        const responseText = response.trim();
        const arr = responseText.split(",");
        const questionText = arr[0];
        const options = arr.slice(1).map((opt) => opt.trim());

        console.log("Options:", options);

        // Create new question object
        const newQuestion: TextQuestion = {
            id: questionText,
            type: "text",
            question: questionText,
            multiSelect: true,
            choices: options
                .filter((opt) => opt !== "")
                .map((title) => ({
                    id: title,
                    title,
                })),
        };

        // Update questions array
        setQuestions([...questions, newQuestion]);

        return newQuestion;
    } catch (error) {
        console.error("Failed to generate next question:", error);
        throw error;
    }
}
