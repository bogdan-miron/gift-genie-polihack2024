'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Occasion {
  id: string;
  title: string;
  image: string;
}

interface GiftGridProps {
  multiSelect?: boolean;
  onSelectionChange?: (selectedOccasions: string[]) => void;
}

const occasions: Occasion[] = [
  {
    id: 'christmas',
    title: 'Christmas',
    image: '/Christmas WebP Resize.jpg',
  },
  {
    id: 'birthday',
    title: 'Birthday',
    image: '/Christmas WebP Resize.jpg',
  },
  {
    id: 'valentines',
    title: "Valentine's Day",
    image: '/Christmas WebP Resize.jpg',
  },
  {
    id: 'anniversary',
    title: 'Anniversary',
    image: '/Christmas WebP Resize.jpg',
  },
  {
    id: 'wedding',
    title: 'Wedding',
    image: '/Christmas WebP Resize.jpg',
  },
  {
    id: 'mothers-day',
    title: "Mother's Day",
    image: '/Christmas WebP Resize.jpg',
  },
  {
    id: 'fathers-day',
    title: "Father's Day",
    image: '/Christmas WebP Resize.jpg',
  },
  {
    id: 'baby-shower',
    title: 'Baby Shower',
    image: '/Christmas WebP Resize.jpg',
  },
  {
    id: 'birth',
    title: 'Birth',
    image: '/Christmas WebP Resize.jpg',
  },
  {
    id: 'graduation',
    title: 'Graduation',
    image: '/Christmas WebP Resize.jpg',
  },
  {
    id: 'housewarming',
    title: 'Housewarming',
    image: '/Christmas WebP Resize.jpg',
  },
  {
    id: 'other',
    title: 'Other',
    image: '/Christmas WebP Resize.jpg',
  },
];

export default function GiftGrid({
  multiSelect = false,
  onSelectionChange,
}: GiftGridProps) {
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);

  const handleSelection = (id: string) => {
    let newSelection: string[];

    if (multiSelect) {
      newSelection = selectedOccasions.includes(id)
        ? selectedOccasions.filter((item) => item !== id)
        : [...selectedOccasions, id];
    } else {
      newSelection = [id];
    }

    setSelectedOccasions(newSelection);
    onSelectionChange?.(newSelection);
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold text-center mb-8'>
        What is the occasion?
      </h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {occasions.map((occasion) => (
          <div
            key={occasion.id}
            className={cn(
              'group relative aspect-square overflow-hidden rounded-lg cursor-pointer p-[3px] bg-transparent',
              'transition-all duration-300 ',
              selectedOccasions.includes(occasion.id) && [
                'bg-gradient-to-r from-primary-300 via-primary-500 to-primary-600',
                'hover:shadow-2xl hover:shadow-primary-500/40',
                'shadow-xl shadow-primary-500/30',
              ]
            )}
            onClick={() => handleSelection(occasion.id)}
          >
            <div
              className={cn(
                'relative h-full w-full overflow-hidden rounded-lg bg-background',
                selectedOccasions.includes(occasion.id) && 'bg-background'
              )}
            >
              <Image
                src={occasion.image}
                alt={occasion.title}
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
                {occasion.title}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
