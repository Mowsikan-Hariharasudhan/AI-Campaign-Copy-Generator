export const TONES = [
  {
    id: 'Professional',
    label: 'Professional',
    description: 'Clear, polished, restrained, enterprise-grade.'
  },
  {
    id: 'Energetic',
    label: 'Energetic',
    description: 'Active, upbeat, action-oriented, dynamic.'
  },
  {
    id: 'Playful',
    label: 'Playful',
    description: 'Light, engaging, witty, modern D2C vibe.'
  },
  {
    id: 'Premium',
    label: 'Premium',
    description: 'Refined, elegant, high-end, sophisticated.'
  },
  {
    id: 'Urgent',
    label: 'Urgent',
    description: 'High-action, time-sensitive, drives fast conversion.'
  },
  {
    id: 'Friendly',
    label: 'Friendly',
    description: 'Warm, conversational, approachable, authentic.'
  }
];

export const CAMPAIGN_PRESETS = [
  {
    id: 'running-shoes',
    name: 'AirStride Shoes (Assignment Demo)',
    tag: 'Athleisure / Footwear',
    data: {
      productName: 'AirStride Running Shoes',
      productDescription: 'Lightweight running shoes designed for everyday runners. Features breathable mesh, cushioned sole, and anti-slip grip for maximum comfort.',
      offer: '20% Off + Free Shipping',
      targetAudience: 'Men and women aged 20–40 who are looking for comfortable running and walking shoes.',
      campaignObjective: 'Drive purchases during the weekend sale.',
      tone: 'Energetic'
    }
  },
  {
    id: 'luxury-skincare',
    name: 'Lumière Hydration Serum',
    tag: 'Beauty / D2C',
    data: {
      productName: 'Lumière Botanical Hydration Serum',
      productDescription: 'Ultra-nourishing peptide face serum formulated with pure hyaluronic acid, antioxidant rosehip extract, and vitamin C for a radiant, all-day glass skin glow.',
      offer: 'Buy 1 Get 1 at 50% Off + Luxury Travel Pouch',
      targetAudience: 'Skincare enthusiasts aged 25–45 seeking deep hydration and youthful skin barrier restoration.',
      campaignObjective: 'Promote seasonal hydration bundle and convert newsletter subscribers.',
      tone: 'Premium'
    }
  },
  {
    id: 'tech-gadget',
    name: 'AeroPulse ANC Earbuds',
    tag: 'Consumer Tech',
    data: {
      productName: 'AeroPulse Noise-Cancelling Earbuds',
      productDescription: 'Wireless earbuds with active hybrid noise cancellation, 38-hour total playtime, IPX5 sweat resistance, and spatial studio sound.',
      offer: 'Flat $40 Instant Rebate with code AUDIO40',
      targetAudience: 'Daily commuters, gym-goers, and remote professionals needing uninterrupted focus.',
      campaignObjective: 'Clear flash sale inventory in 48 hours.',
      tone: 'Urgent'
    }
  }
];

export const SAMPLE_DATA = CAMPAIGN_PRESETS[0].data;
