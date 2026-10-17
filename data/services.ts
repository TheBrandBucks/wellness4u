export interface Service {
  id: string;
  badge: string;
  title: string;
  /** Word(s) within `title` to highlight in gold */
  highlight: string;
  description: string;
  image: string;
  /** Extra images that rotate with `image` while this service is on screen */
  gallery?: string[];
}

export const services: Service[] = [
  {
    id: 'girls-in-lahore',
    badge: 'LAHORE',
    title: 'Escort Girls in Lahore',
    highlight: 'Lahore',
    description: 'Beautiful and charming girls available in Lahore for your special moments.',
    image: '/Girls-in-lahore.webp',
    gallery: ['/G2.webp', '/G5.webp', '/G6.webp'],
  },
  {
    id: 'party-dance',
    badge: 'EXCLUSIVE',
    title: 'Party & Dance',
    highlight: 'Dance',
    description: 'Enjoy private dance parties with gorgeous girls and a premium experience.',
    image: '/party.webp',
    gallery: ['/p1.jpg', '/p2.jpg', '/p3.jpg'],
  },
];
