export interface ServiceArea {
  id: string;
  name: string;
  city: string;
  description: string;
  image: string;
  imageAlt: string;
  imageCredit: { author: string; license: string; sourceUrl: string };
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
    imageAlt: 'Grand Jamia Masjid, Bahria Town, Lahore',
    imageCredit: {
      author: 'Ameer Hamza07',
      license: 'CC BY-SA 4.0',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Bahria_Grand_Masjid.jpg',
    },
  },
  {
    id: 'dha',
    name: 'DHA',
    city: 'Lahore',
    description:
      'Serving every phase of DHA with verified companions, quick response times, and complete privacy.',
    image: '/areas/dha.jpg',
    imageAlt: 'Lahore Garrison University campus, DHA Phase VI, Lahore',
    imageCredit: {
      author: 'Ikhurramshahzad',
      license: 'CC BY 4.0',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Fountain_Ground_2020.jpg',
    },
  },
  {
    id: 'gulberg',
    name: 'Gulberg',
    city: 'Lahore',
    description:
      'Central Gulberg coverage with elegant, professional companions for hotels, residences, and events.',
    image: '/areas/gulberg.jpg',
    imageAlt: 'Gaddafi Stadium with the Gulberg skyline, Lahore',
    imageCredit: {
      author: 'Ktownboy103',
      license: 'CC0',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Lahore_Skyline.png',
    },
  },
  {
    id: 'johar-town',
    name: 'Johar Town',
    city: 'Lahore',
    description:
      'Reliable, discreet service throughout Johar Town — available around the clock for your convenience.',
    image: '/areas/johar-town.jpg',
    imageAlt: 'Tree-lined main road in Johar Town, Lahore',
    imageCredit: {
      author: 'Shiraz.s10',
      license: 'CC BY-SA 4.0',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Street_View,_Johar_Town.png',
    },
  },
  {
    id: 'model-town',
    name: 'Model Town',
    city: 'Lahore',
    description:
      'Trusted arrangements across Model Town with transparent rates and a premium, respectful experience.',
    image: '/areas/model-town.jpg',
    imageAlt: 'Flower beds at Model Town Park, Lahore',
    imageCredit: {
      author: 'Taha Tahir',
      license: 'CC BY-SA 3.0',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Model_Town_Park,_Lahore.jpg',
    },
  },
];
