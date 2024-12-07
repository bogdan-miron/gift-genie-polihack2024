'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Camera,
  ChevronDown,
  ChevronLeft,
  ImageIcon,
  MessageSquare,
  PenLine,
  Send,
  BarChart,
  Menu,
} from 'lucide-react';

export default function ChatInterface() {
  const [messages] = useState([
    {
      text: 'Hi, can I help you?',
      isBot: true,
    },
  ]);

  return (
    <div className='flex h-screen bg-gradient-to-br from-purple-50 to-purple-100'>
      {/* Main Chat Container */}
      <div className='flex flex-col w-full max-w-2xl mx-auto bg-white'>
        {/* Header */}
        <div className='flex items-center gap-4 p-4 border-b'>
          <Button variant='ghost' size='icon' className='text-purple-500'>
            <ChevronLeft className='w-6 h-6' />
          </Button>
          <div className='flex items-center gap-2'>
            <span className='text-sm font-medium'>AI 1.3.2</span>
            <ChevronDown className='w-4 h-4 text-purple-500' />
          </div>
        </div>

        {/* Chat Messages */}
        <div className='flex-1 overflow-auto p-4 space-y-4'>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.isBot ? 'justify-center' : 'justify-end'
              }`}
            >
              {message.isBot ? (
                <div className='relative p-12 rounded-full bg-gradient-to-br from-purple-400/20 to-purple-600/20'>
                  <div className='absolute inset-0 rounded-full animate-pulse bg-gradient-to-br from-purple-400/10 to-purple-600/10' />
                  <span className='relative text-xl font-medium text-purple-900'>
                    {message.text}
                  </span>
                </div>
              ) : (
                <Card className='max-w-[80%] p-3 bg-purple-50'>
                  <p className='text-gray-800'>{message.text}</p>
                </Card>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className='p-4 border-t border-gray-100'>
          <div className='grid grid-cols-2 gap-2 mb-4'>
            <Button
              variant='outline'
              className='flex items-center gap-2 text-purple-600'
            >
              <ImageIcon className='w-4 h-4' />
              Create an Image
            </Button>
            <Button
              variant='outline'
              className='flex items-center gap-2 text-purple-600'
            >
              <PenLine className='w-4 h-4' />
              Rewrite
            </Button>
            <Button
              variant='outline'
              className='flex items-center gap-2 text-purple-600'
            >
              <MessageSquare className='w-4 h-4' />
              Make a Plan
            </Button>
            <Button
              variant='outline'
              className='flex items-center gap-2 text-purple-600'
            >
              <BarChart className='w-4 h-4' />
              Analyse the Data
            </Button>
          </div>

          {/* Input Area */}
          <div className='flex items-center gap-2'>
            <Button variant='ghost' size='icon'>
              <Camera className='w-5 h-5 text-purple-500' />
            </Button>
            <Input
              placeholder='Write here...'
              className='flex-1 bg-gray-50 border-0 focus-visible:ring-purple-500'
            />
            <Button size='icon' className='bg-purple-500 hover:bg-purple-600'>
              <Send className='w-4 h-4' />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className='flex items-center justify-between p-4 border-t md:hidden'>
          <Button variant='ghost' size='icon'>
            <Menu className='w-5 h-5 text-purple-500' />
          </Button>
        </div>
      </div>
    </div>
  );
}
