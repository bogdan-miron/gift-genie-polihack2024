'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface Choice {
  id: string;
  title: string;
  image: string;
}

interface GiftGridProps {
  question: string;
  choices: Choice[];
  onSelectionChange: (selectedChoices: string[]) => void;
  multiSelect?: boolean;
  initialSelection?: string[];
}

export default function GiftGrid({
  question,
  choices,
  onSelectionChange,
  multiSelect = false,
  initialSelection = [],
}: GiftGridProps) {
  const [selectedChoices, setSelectedChoices] =
    useState<string[]>(initialSelection);

  const handleSelection = (id: string) => {
    let newSelection: string[];

    if (multiSelect) {
      newSelection = selectedChoices.includes(id)
        ? selectedChoices.filter((item) => item !== id)
        : [...selectedChoices, id];
    } else {
      newSelection = [id];
    }

    setSelectedChoices(newSelection);
    onSelectionChange(newSelection);
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold text-center mb-8'>{question}</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
        {choices.map((choice) => (
          <div
            key={choice.id}
            className={cn(
              'group relative aspect-square overflow-hidden rounded-lg cursor-pointer p-[3px] bg-transparent',
              'transition-all duration-300 ',
              selectedChoices.includes(choice.id) && [
                'bg-gradient-to-r from-primary-300 via-primary-500 to-primary-600',
                'hover:shadow-2xl hover:shadow-primary-500/40',
                'shadow-xl shadow-primary-500/30',
              ]
            )}
            onClick={() => handleSelection(choice.id)}
          >
            <div
              className={cn(
                'relative h-full w-full overflow-hidden rounded-lg bg-background',
                selectedChoices.includes(choice.id) && 'bg-background'
              )}
            >
              <Image
                src={choice.image}
                alt={choice.title}
                className='object-cover transition-transform duration-500 group-hover:scale-110 brightness-[0.8]'
                fill
                sizes='(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw'
              />
            </div>
            <div className='absolute inset-0 flex items-center justify-center'>
              <h2
                className='text-white font-semibold text-base sm:text-md md:text-lg lg:text-lg 
                           max-w-[80%] text-center break-words'
              >
                {choice.title}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
