import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaRegSmile,
  FaClock,
  FaBox,
  FaLink,
  FaGift,
  FaUserFriends,
} from 'react-icons/fa';

const benefits = [
  {
    title: 'Personalized and Thoughtful Recommendations',
    description:
      "Gift Genie tailors every suggestion to match the recipient's personality, preferences, and the occasion.",
    icon: <FaRegSmile className='h-10 w-10 text-primary' />, // Example icon
  },
  {
    title: 'Saves Time and Reduces Stress',
    description:
      'No more endless scrolling or wandering through stores. Our streamlined process helps you find the perfect gift in minutes.',
    icon: <FaClock className='h-10 w-10 text-primary' />, // Example icon
  },
  {
    title: 'Diverse and Curated Options',
    description:
      'From unique experiences to thoughtful keepsakes, our gift ideas cover a wide range of interests, themes, and budgets.',
    icon: <FaBox className='h-10 w-10 text-primary' />, // Example icon
  },
  {
    title: 'Seamless and Non-Intrusive Integration',
    description:
      'With easy-to-follow suggestions and direct links to purchase, finding and ordering the perfect gift is effortless.',
    icon: <FaLink className='h-10 w-10 text-primary' />, // Example icon
  },
  {
    title: 'Smart Seasonal and Occasion-Based Suggestions',
    description:
      'Stay ahead of every event with curated recommendations for holidays, birthdays, anniversaries, and more.',
    icon: <FaGift className='h-10 w-10 text-primary' />, // Example icon
  },
  {
    title: 'Built for Everyone',
    description:
      "Whether you're a last-minute shopper, a busy professional, or someone looking to impress, Gift Genie makes gifting simple and delightful.",
    icon: <FaUserFriends className='h-10 w-10 text-primary' />, // Example icon
  },
];

export default function WhyChooseUs() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  return (
    <section id='why-choose-us'>
      <div ref={ref} className='container px-4 md:px-6'>
        <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12'>
          Why Choose Gift Genie?
        </h2>
        <div className='grid gap-10 sm:grid-cols-2 md:grid-cols-3'>
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              //@ts-expect-error something wrong with the types
              className='flex flex-col items-center space-y-4 p-6 rounded-2xl shadow-lg bg-white border border-gray-200'
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
                type: 'spring',
                stiffness: 150,
              }}
              whileHover={{ scale: 1.05 }}
            >
              <div className='h-16 w-16 flex items-center justify-center '>
                {benefit.icon}
              </div>
              <h3 className='text-lg font-semibold text-center text-primary-900'>
                {benefit.title}
              </h3>
              <p className='text-sm text-center text-gray-500'>
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
