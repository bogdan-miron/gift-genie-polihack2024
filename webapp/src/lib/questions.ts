import { Question } from './store';

export const questions: Question[] = [
  {
    id: 'age',
    type: 'text',
    question: 'What is their age range?',
    multiSelect: false,
    choices: [
      { id: '0-2', title: '0-2 years' },
      { id: '3-5', title: '3-5 years' },
      { id: '6-9', title: '6-9 years' },
      { id: '10-12', title: '10-12 years' },
      { id: '13-17', title: '13-17 years' },
      { id: '18-25', title: '18-25 years' },
      { id: '26-35', title: '26-35 years' },
      { id: '36-50', title: '36-50 years' },
      { id: '51-65', title: '51-65 years' },
      { id: '65+', title: '65+ years' },
    ],
  },
  {
    id: 'gender',
    type: 'text',
    question: 'What is their gender?',
    multiSelect: false,
    choices: [
      { id: 'male', title: 'Male' },
      { id: 'female', title: 'Female' },
    ],
  },
  {
    id: 'relationship',
    type: 'text',
    question: 'What is your relationship with them?',
    multiSelect: false,
    choices: [
      { id: 'family', title: 'Family' },
      { id: 'romantic-partner', title: 'Romantic Partner' },
      { id: 'friend', title: 'Friend' },
      { id: 'close-friend', title: 'Close Friend' },
      { id: 'professional', title: 'Professional/Co-worker' },
    ],
  },
  {
    id: 'interests',
    type: 'text',
    question: 'What are their areas of interest?',
    multiSelect: true,
    choices: [
      { id: 'food-drinks', title: 'Food & Drinks' },
      { id: 'health-wellness', title: 'Health & Wellness' },
      { id: 'technology', title: 'Technology' },
      { id: 'books-readings', title: 'Books & Readings' },
      { id: 'experiences', title: 'Experiences' },
      { id: 'travel', title: 'Travel' },
      { id: 'fashion', title: 'Fashion' },
      { id: 'home-living', title: 'Home & Living' },
      { id: 'pets', title: 'Pets' },
      { id: 'entertainment', title: 'Entertainment' },
    ],
  },
  {
    id: 'occasion',
    type: 'image',
    question: 'What is the occasion?',
    multiSelect: false,
    choices: [
      {
        id: 'birthday',
        title: 'Birthday',
        image: '/Christmas WebP Resize.jpg',
      },
      {
        id: 'christmas',
        title: 'Christmas',
        image: '/Christmas WebP Resize.jpg',
      },
      // Add more occasion choices here
    ],
  },
  {
    id: 'style',
    type: 'image',
    question: 'What style do they prefer?',
    multiSelect: true,
    choices: [
      {
        id: 'modern',
        title: 'Modern',
        image: '/Christmas WebP Resize.jpg',
      },
      {
        id: 'classic',
        title: 'Classic',
        image: '/Christmas WebP Resize.jpg',
      },
      // Add more style choices here
    ],
  },
  // Add more image-based questions here
];
