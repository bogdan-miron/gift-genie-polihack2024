'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useGiftFinderStore } from '@/lib/store';
import { useEffect, useState } from 'react';
import { generateGiftSuggestions } from '@/lib/ai-service';

export default function ResultsPage() {
  const { answers, clearAnswers, aiSuggestions, setAiSuggestions } =
    useGiftFinderStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (Object.keys(answers).length === 0) {
      router.push('/');
    } else {
      generateSuggestions();
    }
  }, [answers, router]);

  const generateSuggestions = async () => {
    setIsLoading(true);
    const suggestions = await generateGiftSuggestions(answers);
    setAiSuggestions(suggestions);
    setIsLoading(false);
  };

  const startOver = () => {
    clearAnswers();
    setAiSuggestions(null);
    router.push('/');
  };

  if (Object.keys(answers).length === 0) {
    return null;
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-3xl font-bold text-center mb-8'>
          Your Gift Recommendations
        </h1>

        {isLoading ? (
          <div className='text-center'>Generating recommendations...</div>
        ) : (
          <>
            {aiSuggestions && (
              <div className='bg-muted p-4 rounded-lg mb-8'>
                <h2 className='text-xl font-semibold mb-4'>
                  Recommended Categories:
                </h2>
                <p className='whitespace-pre-wrap'>{aiSuggestions}</p>
              </div>
            )}

            <div className='bg-muted p-4 rounded-lg mb-8'>
              <h2 className='text-xl font-semibold mb-4'>
                Based on your choices:
              </h2>
              <pre className='whitespace-pre-wrap'>
                {JSON.stringify(answers, null, 2)}
              </pre>
            </div>

            {/* Gift recommendations grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {/* Add your gift recommendation logic here based on answers */}
              <div className='p-4 border rounded-lg'>
                <h3 className='font-semibold'>Sample Gift Recommendation</h3>
                <p>
                  This is where you would show gift recommendations based on the
                  user&apos;s answers.
                </p>
              </div>
            </div>

            <div className='mt-8 text-center'>
              <Button onClick={startOver}>Start Over</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
