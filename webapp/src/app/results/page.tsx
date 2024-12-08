'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useGiftFinderStore } from '@/lib/store';
import { useEffect, useState } from 'react';
import { generateGiftSuggestions } from '@/lib/ai-service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Gift, RefreshCw, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

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

    // Get questions from the store instead of importing them
    const { questions } = useGiftFinderStore.getState();

    try {
      const suggestions = await generateGiftSuggestions(answers, questions);
      setAiSuggestions(suggestions);
    } catch (error) {
      console.error('Failed to generate suggestions:', error);
    } finally {
      setIsLoading(false);
    }
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
    <div className='container mx-auto px-4 py-12'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        // @ts-expect-error - framer-motion types
        className='max-w-4xl mx-auto'
      >
        <h1 className='text-4xl font-bold text-center mb-8 text-primary'>
          Your Gift Recommendations
        </h1>

        {isLoading ? (
          <Card>
            <CardHeader>
              <CardTitle>Generating recommendations...</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-2'>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-3/4' />
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            {aiSuggestions && (
              <Card className='mb-8'>
                <CardHeader>
                  <CardTitle className='flex items-center'>
                    <Gift className='mr-2' />
                    Recommended Categories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='whitespace-pre-wrap text-muted-foreground'>
                    {aiSuggestions}
                  </p>
                </CardContent>
              </Card>
            )}

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {aiSuggestions?.split(',').map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className='h-full hover:shadow-lg transition-shadow duration-300'>
                    <CardHeader>
                      <CardTitle className='text-lg'>{item.trim()}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className='text-sm text-muted-foreground'>
                        Click to see more details about this gift suggestion
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            <div className='mt-12 flex justify-center space-x-4'>
              <Button
                onClick={startOver}
                variant='outline'
                className='flex items-center'
              >
                <ArrowLeft className='mr-2 h-4 w-4' /> Start Over
              </Button>
              <Button
                onClick={generateSuggestions}
                className='flex items-center'
              >
                <RefreshCw className='mr-2 h-4 w-4' /> Regenerate Suggestions
              </Button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
