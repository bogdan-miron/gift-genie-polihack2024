'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useGiftFinderStore } from '@/lib/store';
import { generateNextQuestion } from '@/lib/ai-service';
import GiftGrid from './gift-grid';
import TextGrid from './text-grid';
import { ProgressBar } from './progress-bar';

export function GiftFinderForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const { answers, setAnswers, questions, setQuestions } = useGiftFinderStore();
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const step = parseInt(searchParams.get('step') || '1', 10);
    setCurrentStep(step);
  }, [searchParams]);

  const handleSelectionChange = (selectedChoices: string[]) => {
    const currentQuestion = questions[currentStep - 1];
    setAnswers({
      ...answers,
      [currentQuestion.id]: selectedChoices,
    });
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
    <Card 
      className="w-full max-w-4xl mx-auto p-6 rounded-lg shadow-lg"
      style={{
        boxShadow: '0px 8px 20px rgba(128, 90, 213, 0.3)', // Purple shadow
        background: 'white', // Background color
      }}
    >
      <CardHeader>
        
      </CardHeader>
      <CardContent>
        <div className="mt-6">

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
                      </div>
      </CardContent>
      <CardFooter className="flex justify-between mt-8">
        <Button 
          onClick={goToPreviousQuestion} 
          disabled={currentStep === 1}
          variant="outline"
        >
          Previous
        </Button>
        <Button
          onClick={goToNextQuestion}
          disabled={isGenerating || !answers[currentQuestion.id]?.length}
        >
          {isGenerating ? 'Generating...' : currentStep === questions.length ? 'Finish' : 'Next'}
        </Button>
      </CardFooter>
    </Card>
  );
}
