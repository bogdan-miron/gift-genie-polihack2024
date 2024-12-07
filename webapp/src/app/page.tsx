"use client";

import GiftGrid, { Prompt } from "@/components/gift-grid";
import { Button } from "@/components/ui/button";
import { useReducer, useRef, useState } from "react";

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyBEY6NYK0VWTlzcX5Fgs4tww_TDZS4oJSg");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const questionSet = [
    {
        question: "Age:",
        options: ["0-2", "3-5", "6-9", "10-12", "13-17", "18-25", "26-35", "36-50", "51-65", "65+"],
        multiselect: false,
    },
    {
        question: "Gender:",
        options: ["Male", "Female"],
        multiselect: false,
    },
    {
        question: "Your relationship",
        options: ["Family", "Romantic Partner", "Friend", "Close Friend", "Professional/Co-worker"],
        multiselect: false,
    },
    {
        question: "Areas of interest",
        options: [
            "Food & Drinks",
            "Health & Wellness",
            "Technology",
            "Books & Readings",
            "Experiences",
            "Travel",
            "Fashion",
            "Home & Living",
            "Pets",
            "Entertainment",
        ],
        multiselect: true,
    },
];

interface Answer {
    question: string;
    answer: string;
}

export default function ChatInterface() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [startingAnswers, setStartingAnswers] = useState<Answer[]>([]);
    const [aiResponses, setAiResponses] = useState<string>();
    const [result, setResult] = useState<string | null>(null);

    let selection: string[] = [];

    const recordSelection = async () => {
        let entry: Answer = {
            question: questionSet[currentQuestion].question,
            answer: selection.join(","),
        };
        setStartingAnswers((prev) => [...prev, entry]);
        console.log(startingAnswers);
        if (currentQuestion == questionSet.length - 1) {
            console.log("dasdsadas");
            await narrowWithAI();
        } else {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const onSelectionChange = (selected: string[]) => {
        selection = selected;
    };

    const narrowWithAI = async () => {
        let prompt = `I have to buy a present for the following person: 
            ${startingAnswers.map((ans) => ans.question + " " + ans.answer + ",")}. `;

        if (aiResponses) {
            let prevSelections = `The user has selected ${aiResponses} from your previous suggestions.`;
            prompt += prevSelections;
        }

        prompt +=
            "Please generate maximum 6 comma-separated non-repeating subcategories of the specified categories to narrow down the search. It cannot be a specific object, it can only be a category listed on wikipedia";

        console.log(prompt);
        const unParsedResult = await model.generateContent(prompt);
        setResult(unParsedResult.response.text());
    };

    return (
        <div className="flex flex-col h-screen justify-center items-center">
            <div className="w-[50%]">
                <GiftGrid
                    prompt={questionSet[currentQuestion] as Prompt}
                    onSelectionChange={onSelectionChange}
                />
            </div>
            <Button
                className="mt-8 bg-primary-500 text-white"
                onClick={recordSelection}
            >
                Click me
            </Button>
            {result !== null ? <div>`asta o dat: ${result}`</div> : null}
        </div>
    );
}
