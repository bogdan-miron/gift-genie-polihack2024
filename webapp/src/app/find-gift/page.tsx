import { GiftFinderForm } from '@/components/gift-finder-form';

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen justify-center items-center'>
      <div className='w-full max-w-4xl'>
        <GiftFinderForm />
      </div>
    </div>
  );
}
