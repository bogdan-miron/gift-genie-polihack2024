'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useGiftFinderStore } from '@/lib/store';
import { useEffect, useState } from 'react';
import { generateGiftSuggestions } from '@/lib/ai-service';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Gift, RefreshCw, ArrowLeft, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
interface ResultAi {
  text: string;
  imgUrl: string;
}

export default function ResultsPage() {
  const { answers, clearAnswers, aiSuggestions, setAiSuggestions } =
    useGiftFinderStore();
  const [suggestions, setSuggestions] = useState<ResultAi[] | null>(null);
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

    const { questions } = useGiftFinderStore.getState();

    try {
      const suggestionsString = await generateGiftSuggestions(
        answers,
        questions
      );

      if (!suggestionsString) {
        throw new Error('No suggestions returned');
      }

      const suggestionsArray = suggestionsString
        .split(',')
        .map((s) => s.trim());
      const suggestions = await Promise.all(
        suggestionsArray.map(async (s) => {
          try {
            const data = await fetch(
              `https://api.unsplash.com/search/photos?page=1&query=${encodeURI(
                s
              )}&client_id=${process.env.UNSPLASH_API_KEY}`
            );
            console.log(data);
            const dataJ = await data.json();
            const result = dataJ.results[0];

            const imgUrl = result.urls.regular || '';
            return {
              text: `${s.charAt(0).toUpperCase()}${s.slice(1)}`,
              imgUrl,
            };
          } catch (imageError) {
            console.error(`Failed to fetch image for ${s}:`, imageError);
            return { text: s, imgUrl: '' };
          }
        })
      );

      setSuggestions(suggestions);
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
        //@ts-expect-error 232
        className='max-w-6xl mx-auto'
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
              <Card className='mb-8 bg-primary/5'>
                <CardHeader>
                  <CardTitle className='flex items-center text-primary'>
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
              {suggestions!.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className='h-full hover:shadow-lg transition-all duration-300 group overflow-hidden'>
                    <CardHeader className='relative p-0'>
                      <div className='relative h-48 w-full overflow-hidden'>
                        <Image
                          src={item.imgUrl}
                          alt={item.text}
                          fill
                          className='object-cover transition-transform duration-500 group-hover:scale-110'
                          sizes='(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw'
                        />
                        <div className='absolute inset-0 bg-black/15 transition-opacity duration-300 ' />
                      </div>
                      <CardTitle className='absolute bottom-2 left-2 right-2 text-white text-xl font-bold p-2 bg-black/30 rounded'>
                        {item.text}
                      </CardTitle>
                    </CardHeader>
                    <a
                      href={`https://www.amazon.com/s?k=${encodeURI(
                        item.text
                      )}`}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <CardContent className='pt-4'>
                        <CardDescription className='text-sm text-muted-foreground mb-4'>
                          Discover unique gift ideas related to{' '}
                          {item.text.toLowerCase()}.
                        </CardDescription>
                        <Button
                          variant='outline'
                          className='w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300'
                        >
                          Explore <ExternalLink className='ml-2 h-4 w-4' />
                        </Button>
                      </CardContent>
                    </a>
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
