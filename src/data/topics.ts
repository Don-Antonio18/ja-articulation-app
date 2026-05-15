export const CATEGORIES = [
  'General',
  'Technology',
  'Finance',
  'History',
  'Sports',
  'One-Minute Idea Pitch',
] as const;

export type Category = (typeof CATEGORIES)[number];

export const TOPICS: Record<Category, string[]> = {
  General: [
    'A small habit that improved your daily life',
    'A meaningful lesson from a recent mistake',
    'The best advice you have received',
    'A place that feels like home',
    'A time you surprised yourself',
  ],
  Technology: [
    'How AI could change everyday routines',
    'The most useful app on your phone',
    'A technology you think is overrated',
    'What makes a great user experience',
    'How software shapes modern work',
  ],
  Finance: [
    'A smart way to manage spending',
    'Why emergency savings matter',
    'The difference between needs and wants',
    'A financial goal worth planning for',
    'How compound interest works in real life',
  ],
  History: [
    'A historical event that still matters today',
    'A leader you would study and why',
    'A lesson from the past society should remember',
    'The most important invention in history',
    'How history changes the way people think',
  ],
  Sports: [
    'What makes a great team player',
    'A sport you wish more people understood',
    'The role of discipline in athletic success',
    'A memorable comeback in sports',
    'How sports build community',
  ],
  'One-Minute Idea Pitch': [
    'Pitch an app that solves one daily annoyance',
    'Sell a product that makes meetings better',
    'Describe a service for busy students',
    'Pitch a tool that saves time every week',
    'Present an idea that improves focus',
  ],
};

export function getTopicsForCategory(category: Category) {
  return TOPICS[category];
}

export function pickRandomTopic(category: Category, randomValue = Math.random()) {
  const topics = TOPICS[category];
  const index = Math.floor(randomValue * topics.length) % topics.length;
  return topics[index];
}
