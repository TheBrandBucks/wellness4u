export interface ServiceArea {
  id: string;
  name: string;
  city: string;
  description: string;
  image: string;
}

/**
 * Shared WhatsApp contact number (international format, no "+", spaces, or dashes).
 * Update this single constant to change the number site-wide.
 */
export const WHATSAPP_NUMBER = '923246262754';

export const serviceAreas: ServiceArea[] = [
  {
    id: 'bahria-town',
    name: 'Bahria Town',
    city: 'Lahore',
    description:
      'Fast, discreet doorstep availability across all blocks of Bahria Town — premium service day and night.',
    image: '/areas/bahria-town.jpg',
  },
  {
    id: 'dha',
    name: 'DHA',
    city: 'Lahore',
    description:
      'Serving every phase of DHA with verified companions, quick response times, and complete privacy.',
    image: '/areas/dha.jpg',
  },
  {
    id: 'gulberg',
    name: 'Gulberg',
    city: 'Lahore',
    description:
      'Central Gulberg coverage with elegant, professional companions for hotels, residences, and events.',
    image: '/areas/gulberg.jpg',
  },
  {
    id: 'johar-town',
    name: 'Johar Town',
    city: 'Lahore',
    description:
      'Reliable, discreet service throughout Johar Town — available around the clock for your convenience.',
    image: '/areas/johar-town.jpg',
  },
  {
    id: 'model-town',
    name: 'Model Town',
    city: 'Lahore',
    description:
      'Trusted arrangements across Model Town with transparent rates and a premium, respectful experience.',
    image: '/areas/model-town.jpg',
  },
];
