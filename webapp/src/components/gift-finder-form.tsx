'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import GiftGrid from './gift-grid';
import TextGrid from './text-grid';
import { Button } from '@/components/ui/button';
import { ProgressBar } from './progress-bar';
import { useGiftFinderStore } from '@/lib/store';
import { generateNextQuestion } from '@/lib/ai-service';

export function GiftFinderForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const { answers, setAnswers, questions, setQuestions } = useGiftFinderStore();
  const [isGenerating, setIsGenerating] = useState(false);
  let selected: string[] = [];

  useEffect(() => {
    const step = parseInt(searchParams.get('step') || '1', 10);
    setCurrentStep(step);
  }, [searchParams]);

  const handleSelectionChange = (selectedChoices: string[]) => {
    const currentQuestion = questions[currentStep - 1];
    console.log('currentQuestion', currentQuestion);
    console.log('selectedChoices', selectedChoices);
    selected = selectedChoices;
    const newAnswers = {
      ...answers,
      // Simply store the selectedChoices array directly
      [currentQuestion.id]: selected,
    };
    setAnswers(newAnswers);
  };

  const goToNextQuestion = async () => {
    if (currentStep < questions.length) {
      router.push(`?step=${currentStep + 1}`);
    } else {
      setIsGenerating(true);
      try {
        if (currentStep < 10) {
          await generateNextQuestion(questions, answers, setQuestions);
          router.push(`?step=${currentStep + 1}`);
        } else {
          router.push('/results');
        }
      } catch (error) {
        console.error('Failed to generate new question:', error);
      }
      setIsGenerating(false);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentStep > 1) {
      router.push(`?step=${currentStep - 1}`);
    }
  };

  const currentQuestion = questions[currentStep - 1];

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <ProgressBar currentStep={currentStep} totalSteps={questions.length} />
      {currentQuestion.type === 'image' ? (
        <GiftGrid
          question={currentQuestion.question}
          choices={currentQuestion.choices}
          onSelectionChange={handleSelectionChange}
          multiSelect={currentQuestion.multiSelect}
          initialSelection={[]}
        />
      ) : (
        <TextGrid
          question={currentQuestion.question}
          choices={currentQuestion.choices}
          onSelectionChange={handleSelectionChange}
          multiSelect={currentQuestion.multiSelect}
          initialSelection={[]}
        />
      )}
      <div className='flex justify-between mt-8'>
        <Button onClick={goToPreviousQuestion} disabled={currentStep === 1}>
          Previous
        </Button>
        <Button
          onClick={goToNextQuestion}
          disabled={isGenerating || !answers[currentQuestion.id]?.length}
        >
          {isGenerating ? 'Generating...' : 'Next'}
        </Button>
      </div>
    </div>
  );
}
