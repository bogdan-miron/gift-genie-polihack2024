import { GiftFinderForm } from '@/components/gift-finder-form';
import { Suspense } from 'react';

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen justify-center items-center'>
      <div className='w-full max-w-4xl'>
        <Suspense fallback={<div>Loading...</div>}>
          <GiftFinderForm />
        </Suspense>
      </div>
    </div>
  );
}
