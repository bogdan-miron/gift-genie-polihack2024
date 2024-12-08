'use client';

import { useEffect } from 'react';
import Link from 'next/link';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();
  useEffect(() => {
    const handleScroll = (e: Event) => {
      e.preventDefault();
      const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
      if (href) {
        const targetId = href.replace('#', '');
        const elem = document.getElementById(targetId);
        elem?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    const links = document.querySelectorAll('nav a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener('click', handleScroll);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener('click', handleScroll);
      });
    };
  }, []);

  return (
    <div className='flex flex-col min-h-screen'>
      <header className='fixed top-0 left-0 right-0 px-4 lg:px-6 h-14 flex items-center bg-gradient-to-b from-primary-100/80 via-primary-100/80 to-white/0 z-50'>
        <Link className='flex items-center justify-center' href='#'>
          <span className='font-bold text-2xl'>Gift Genie</span>
        </Link>
        <nav className='ml-auto flex gap-4 sm:gap-6'>
          <Link
            className='text-sm font-medium hover:underline underline-offset-4'
            href='#how-it-works'
          >
            How It Works
          </Link>
          <Link
            className='text-sm font-medium hover:underline underline-offset-4'
            href='#why-choose-us'
          >
            Why Choose Us
          </Link>
        </nav>
      </header>
      <main className='flex-1 pt-14'>
        <section
          id='home'
          className='w-full py-12 md:py-16 lg:py-26 xl:py-42 bg-gradient-to-b from-white via-transparent to-primary-50 flex flex-col items-center justify-center'
        >
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center space-y-4 text-center'>
              <div className='space-y-2 justify-center flex flex-col'>
                <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none'>
                  Welcome to Gift Genie
                </h1>
                <p className='mx-auto max-w-[700px] text-gray-500'>
                  Your personal gift-giving assistant. Find the perfect present
                  for any occasion.
                </p>
              </div>
              <div className='w-full max-w-2xl space-y-4 text-center mx-auto'>
                <button
                  onClick={() => router.push('/find-gift')}
                  className='relative w-2/3 sm:w-1/2 md:w-1/3 h-[200px] mx-auto group cursor-pointer hover:scale-110 transition-transform duration-300  '
                >
                  <div className='relative h-full w-full transition-all duration-500 group'>
                    <Image
                      id='floatingImage'
                      src='/genie.png'
                      alt='Gift Genie'
                      className='object-cover transition-opacity duration-500'
                      fill
                    />
                  </div>
                </button>
                <div>
                  <p className='mx-auto max-w-[700px] text-gray-500'>
                    Ready to Find the Perfect Gift?
                  </p>
                  <p className='mx-auto max-w-[700px] text-gray-500'>
                    Start your gift-finding journey today and make your loved
                    ones smile.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id='how-it-works'
          className='w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-primary-50 via-primary-100 to-primary-100'
        >
          <div className='container px-4 md:px-6'>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8'>
              How It Works
            </h2>
            <div className='grid gap-10 sm:grid-cols-2 md:grid-cols-3'>
              <div className='flex flex-col items-center space-y-2 border-primary-200 p-4 rounded-lg'>
                <svg
                  className='h-10 w-10 text-primary'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path d='M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z' />
                  <path d='m9 12 2 2 4-4' />
                </svg>
                <h3 className='text-xl font-bold'>
                  Tell Us About the Recipient
                </h3>
                <p className='text-gray-500 text-center'>
                  Share details about the person you&apos;re buying for.
                </p>
              </div>
              <div className='flex flex-col items-center space-y-2 border-primary-200 p-4 rounded-lg'>
                <svg
                  className='h-10 w-10 text-primary'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path d='m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z' />
                </svg>
                <h3 className='text-xl font-bold'>
                  Get Personalized Suggestions
                </h3>
                <p className='text-gray-500 text-center'>
                  Our AI generates tailored gift ideas.
                </p>
              </div>
              <div className='flex flex-col items-center space-y-2 border-primary-200 p-4 rounded-lg'>
                <svg
                  className='h-10 w-10 text-primary'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path d='M5 12h14' />
                  <path d='m12 5 7 7-7 7' />
                </svg>
                <h3 className='text-xl font-bold'>Choose and Purchase</h3>
                <p className='text-gray-500 text-center'>
                  Select your favorite and buy with ease.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          id='why-choose-us'
          className='w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-primary-100 via-transparent to-white'
        >
          <div className='container px-4 md:px-6'>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8'>
              Why Choose Gift Genie?
            </h2>
            <div className='grid gap-10 sm:grid-cols-2 md:grid-cols-3'>
              {/* Additional icons and benefits */}
            </div>
          </div>
        </section>
        <footer className='flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t from-white via-primary-50 to-primary-100'>
          <p className='text-xs text-gray-500'>
            © 2023 Gift Genie. All rights reserved.
          </p>
          <nav className='sm:ml-auto flex gap-4 sm:gap-6'>
            <Link
              className='text-xs hover:underline underline-offset-4'
              href='#'
            >
              Terms of Service
            </Link>
            <Link
              className='text-xs hover:underline underline-offset-4'
              href='#'
            >
              Privacy
            </Link>
          </nav>
        </footer>
      </main>
    </div>
  );
}
