export interface User {
  id: string;
  name: string;
  email: string;
  role: 'graduate' | 'employer';
  avatar?: string;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  progress: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  price: number; // in Naira
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Remote';
  salary: string;
  description: string;
  postedAt: string;
}

export const COURSES: Course[] = [
  {
    id: '1',
    title: 'Modern Web Development',
    category: 'Development',
    description: 'Learn React, Tailwind, and Node.js to build production-scale apps.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600',
    progress: 45,
    level: 'Beginner',
    price: 5000,
  },
  {
    id: '2',
    title: 'Data Science with Python',
    category: 'Data Science',
    description: 'Master data analysis, visualization, and machine learning basics.',
    image: 'https://images.unsplash.com/photo-1551288049-bbda38a5f9a2?auto=format&fit=crop&q=80&w=600',
    progress: 10,
    level: 'Intermediate',
    price: 7500,
  },
  {
    id: '3',
    title: 'UI/UX Design Masterclass',
    category: 'Design',
    description: 'Create beautiful and functional user interfaces using Figma.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600',
    progress: 80,
    level: 'Beginner',
    price: 4500,
  },
  {
    id: '4',
    title: 'Digital Marketing Excellence',
    category: 'Marketing',
    description: 'Drive growth through SEO, SEM, and social media strategies.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600',
    progress: 0,
    level: 'Beginner',
    price: 3500,
  },
];

export const JOBS: Job[] = [
  {
    id: '1',
    title: 'Junior Frontend Developer',
    company: 'Flutterwave',
    location: 'Lagos, Nigeria',
    type: 'Full-time',
    salary: '₦250k - ₦400k',
    description: 'We are looking for a passionate frontend developer to join our engineering team.',
    postedAt: '2 days ago',
  },
  {
    id: '2',
    title: 'Product Designer (Remote)',
    company: 'Paystack',
    location: 'Lagos, Nigeria',
    type: 'Remote',
    salary: '₦300k - ₦500k',
    description: 'JoinPaystack to design simple, powerful payments for Africa.',
    postedAt: 'Just now',
  },
  {
    id: '3',
    title: 'Data Analyst Intern',
    company: 'Andela',
    location: 'Remote',
    type: 'Internship',
    salary: '₦80k - ₦120k',
    description: 'Help us drive data-driven decision making across our global network.',
    postedAt: '1 week ago',
  },
  {
    id: '4',
    title: 'Growth Marketing Manager',
    company: 'Kuda Bank',
    location: 'Lagos, Nigeria',
    type: 'Full-time',
    salary: '₦400k - ₦600k',
    description: 'Scale our user base and drive engagement through innovative marketing.',
    postedAt: '3 days ago',
  },
];
