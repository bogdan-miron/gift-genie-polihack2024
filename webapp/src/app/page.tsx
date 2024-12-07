'use client';

import GiftGrid from '@/components/gift-grid';
import { Button } from '@/components/ui/button';

export default function ChatInterface() {
  return (
    <div className='flex flex-col h-screen justify-center items-center'>
      <div className='w-[50%]'>
        <GiftGrid multiSelect />
      </div>
      <Button className='mt-8 bg-primary-500 text-white'>Click me</Button>
    </div>
  );
}
