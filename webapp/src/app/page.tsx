import { GiftFinderForm, Question } from '@/components/gift-finder-form';

// Sample questions data
const questions: Question[] = [
  {
    id: 'occasion',
    question: 'What is the occasion?',
    choices: [
      {
        id: 'birthday',
        title: 'Birthday',
        image: '/Christmas WebP Resize.jpg',
      },
      {
        id: 'anniversary',
        title: 'Anniversary',
        image: '/Christmas WebP Resize.jpg',
      },
      {
        id: 'christmas',
        title: 'Christmas',
        image: '/Christmas WebP Resize.jpg',
      },
      {
        id: 'graduation',
        title: 'Graduation',
        image: '/Christmas WebP Resize.jpg',
      },
    ],
  },
  {
    id: 'recipient',
    question: 'Who is the gift for?',
    choices: [
      {
        id: 'partner',
        title: 'Partner',
        image: '/Christmas WebP Resize.jpg',
      },
      {
        id: 'friend',
        title: 'Friend',
        image: '/Christmas WebP Resize.jpg',
      },
      {
        id: 'family',
        title: 'Family Member',
        image: '/Christmas WebP Resize.jpg',
      },
      {
        id: 'coworker',
        title: 'Coworker',
        image: '/Christmas WebP Resize.jpg',
      },
    ],
  },
  // Add more questions here...
];

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen justify-center items-center'>
      <div className='w-full max-w-4xl'>
        <GiftFinderForm questions={questions} />
      </div>
    </div>
  );
}
