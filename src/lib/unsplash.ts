// Unsplash integration utilities for Booki
const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

export const getUnsplashImage = async (query: string, width = 800, height = 600) => {
  try {
    if (!UNSPLASH_ACCESS_KEY) {
      console.warn('Unsplash API key not found, using fallback image');
      return `https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=${width}&h=${height}&auto=format&fit=crop`;
    }

    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${query}&w=${width}&h=${height}&client_id=${UNSPLASH_ACCESS_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch image from Unsplash');
    }
    
    const data = await response.json();
    return data.urls.regular;
  } catch (error) {
    console.error('Error fetching Unsplash image:', error);
    // Return fallback image
    return `https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=${width}&h=${height}&auto=format&fit=crop`;
  }
};

export const sportImages = {
  padel: 'padel+court+modern+dakar',
  football: 'football+field+green+senegal',
  tennis: 'tennis+court+professional+africa',
  basketball: 'basketball+court+outdoor+dakar',
  general: 'sports+facility+dakar+senegal'
};

// Curated Unsplash image URLs for different sports (fallbacks)
export const fallbackImages = {
  padel: [
    'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1606924842584-95a6f36978e6?w=800&h=600&auto=format&fit=crop'
  ],
  football: [
    'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800&h=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&auto=format&fit=crop'
  ],
  tennis: [
    'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1534158914592-062992fbe900?w=800&h=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542144582-1ba00456b5e3?w=800&h=600&auto=format&fit=crop'
  ],
  basketball: [
    'https://images.unsplash.com/photo-1546834220-7b3b830c2ff0?w=800&h=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=800&h=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1559692048-79a3f837883d?w=800&h=600&auto=format&fit=crop'
  ]
};

// Get a random image from sport-specific fallbacks
export const getRandomSportImage = (sport: keyof typeof fallbackImages): string => {
  const images = fallbackImages[sport];
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};

// Get optimized Unsplash URL with custom parameters
export const getOptimizedUnsplashUrl = (
  baseUrl: string, 
  width = 800, 
  height = 600, 
  quality = 80
): string => {
  if (!baseUrl.includes('unsplash.com')) return baseUrl;
  
  return `${baseUrl}&w=${width}&h=${height}&q=${quality}&auto=format&fit=crop`;
};

// Dakar-specific location images for onboarding and backgrounds
export const dakarImages = {
  sunset: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&auto=format&fit=crop',
  city: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&auto=format&fit=crop',
  sports: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=800&auto=format&fit=crop',
  friends: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=800&auto=format&fit=crop'
}; 