'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useGiftFinderStore } from '@/lib/store';

export default function ResultsPage() {
  const { answers, clearAnswers } = useGiftFinderStore();
  const router = useRouter();

  const startOver = () => {
    clearAnswers();
    router.push('/');
  };

  // If no answers, redirect back to the form
  if (Object.keys(answers).length === 0) {
    router.push('/');
    return null;
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-3xl font-bold text-center mb-8'>
          Your Gift Recommendations
        </h1>

        {/* Debug: Show answers */}
        <div className='bg-muted p-4 rounded-lg mb-8'>
          <h2 className='text-xl font-semibold mb-4'>Based on your choices:</h2>
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
      </div>
    </div>
  );
}
