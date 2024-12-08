'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { TextChoice } from '@/lib/store';

interface TextGridProps {
  question: string;
  choices: TextChoice[];
  onSelectionChange: (selectedChoices: string[]) => void;
  multiSelect?: boolean;
  initialSelection?: string[];
}

export default function TextGrid({
  question,
  choices,
  onSelectionChange,
  multiSelect = false,
  initialSelection = [],
}: TextGridProps) {
  const [selectedChoices, setSelectedChoices] =
    useState<string[]>(initialSelection);

  const handleSelection = (id: string) => {
    // First, filter out any selections that aren't in the current choices
    const validChoices = selectedChoices.filter((choiceId) =>
      choices.some((choice) => choice.id === choiceId)
    );

    let newSelection: string[];
    if (multiSelect) {
      if (validChoices.includes(id)) {
        // If already selected, remove it
        newSelection = validChoices.filter((item) => item !== id);
      } else {
        // If not selected, add it to existing valid selections
        newSelection = [...validChoices, id];
      }
    } else {
      // For single select, just use the new id
      newSelection = [id];
    }

    setSelectedChoices(newSelection);
    onSelectionChange(newSelection);
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold text-center mb-8'>{question}</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {choices.map((choice) => (
          <button
            key={choice.id}
            className={cn(
              'p-4 rounded-lg border-2 transition-all duration-300',
              'hover:border-primary-500',
              selectedChoices.includes(choice.id)
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200'
            )}
            onClick={() => handleSelection(choice.id)}
          >
            <span className='text-lg font-medium'>{choice.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
