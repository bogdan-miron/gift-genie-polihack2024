'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import GiftGrid from './gift-grid';
import { Button } from '@/components/ui/button';
import { ProgressBar } from './progress-bar';

import { Choice } from './gift-grid';

export interface Question {
  id: string;
  question: string;
  choices: Choice[];
}

export function GiftFinderForm({ questions }: { questions: Question[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const step = parseInt(searchParams.get('step') || '1', 10);
    setCurrentStep(step);

    // Restore answers from URL if they exist
    const urlAnswers = searchParams.get('answers');
    if (urlAnswers) {
      setAnswers(JSON.parse(decodeURIComponent(urlAnswers)));
    }
  }, [searchParams]);

  const handleSelectionChange = (selectedChoices: string[]) => {
    const newAnswers = {
      ...answers,
      [questions[currentStep - 1].id]: selectedChoices,
    };
    setAnswers(newAnswers);
  };

  const goToNextQuestion = () => {
    if (currentStep < questions.length) {
      // Save answers in URL when navigating
      const encodedAnswers = encodeURIComponent(JSON.stringify(answers));
      router.push(`?step=${currentStep + 1}&answers=${encodedAnswers}`);
    } else {
      // Handle form submission
      console.log('Form answers:', JSON.stringify(answers, null, 2));
    }
  };

  const goToPreviousQuestion = () => {
    if (currentStep > 1) {
      // Save answers in URL when navigating back
      const encodedAnswers = encodeURIComponent(JSON.stringify(answers));
      router.push(`?step=${currentStep - 1}&answers=${encodedAnswers}`);
    }
  };

  const currentQuestion = questions[currentStep - 1];

  return (
    <div className='container mx-auto px-4 py-8'>
      <ProgressBar currentStep={currentStep} totalSteps={questions.length} />
      <GiftGrid
        question={currentQuestion.question}
        choices={currentQuestion.choices}
        onSelectionChange={handleSelectionChange}
        initialSelection={answers[currentQuestion.id] || []}
      />
      <div className='flex justify-between mt-8'>
        <Button onClick={goToPreviousQuestion} disabled={currentStep === 1}>
          Previous
        </Button>
        <Button onClick={goToNextQuestion}>
          {currentStep === questions.length ? 'Submit' : 'Next'}
        </Button>
      </div>
    </div>
  );
}
