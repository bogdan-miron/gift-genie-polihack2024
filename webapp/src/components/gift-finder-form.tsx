'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import GiftGrid from './gift-grid';
import { Button } from '@/components/ui/button';
import { ProgressBar } from './progress-bar';
import { useGiftFinderStore } from '@/lib/store';
import { Question } from '@/lib/store';
import TextGrid from './text-grid';

export function GiftFinderForm({ questions }: { questions: Question[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const { answers, setAnswers } = useGiftFinderStore();

  useEffect(() => {
    const step = parseInt(searchParams.get('step') || '1', 10);
    setCurrentStep(step);
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
      router.push(`?step=${currentStep + 1}`);
    } else {
      router.push('/results');
    }
  };

  const goToPreviousQuestion = () => {
    if (currentStep > 1) {
      router.push(`?step=${currentStep - 1}`);
    }
  };

  const currentQuestion = questions[currentStep - 1];

  return (
    <div className='container mx-auto px-4 py-8'>
      <ProgressBar currentStep={currentStep} totalSteps={questions.length} />
      {currentQuestion.type === 'image' ? (
        <GiftGrid
          question={currentQuestion.question}
          choices={currentQuestion.choices}
          onSelectionChange={handleSelectionChange}
          multiSelect={currentQuestion.multiSelect}
          initialSelection={answers[currentQuestion.id] || []}
        />
      ) : (
        <TextGrid
          question={currentQuestion.question}
          choices={currentQuestion.choices}
          onSelectionChange={handleSelectionChange}
          multiSelect={currentQuestion.multiSelect}
          initialSelection={answers[currentQuestion.id] || []}
        />
      )}
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
