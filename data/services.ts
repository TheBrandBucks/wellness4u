export interface Service {
  id: string;
  badge: string;
  title: string;
  /** Word(s) within `title` to highlight in gold */
  highlight: string;
  description: string;
  image: string;
}

export const services: Service[] = [
  {
    id: 'night-services',
    badge: 'PREMIUM',
    title: 'Night Services',
    highlight: 'Services',
    description: 'Experience exclusive night services with complete privacy and comfort.',
    image: '/Night-Service.webp',
  },
  {
    id: 'girls-in-lahore',
    badge: 'LAHORE',
    title: 'Girls in Lahore',
    highlight: 'Lahore',
    description: 'Beautiful and charming girls available in Lahore for your special moments.',
    image: '/Girls-in-lahore.webp',
  },
  {
    id: 'party-dance',
    badge: 'EXCLUSIVE',
    title: 'Party & Dance',
    highlight: 'Dance',
    description: 'Enjoy private dance parties with gorgeous girls and a premium experience.',
    image: '/party.webp',
  },
];
