import { User } from './user.type.js';
import { HousingType, HousingFeature, HousingLocation } from './housing.type.js';

export type MockServerData = {
    title: string[];
    description: string[];
    postDate: Date[];
    city: string[];
    preview: string[];
    images: string[];
    isPremium: boolean[];
    isFavorite: boolean[];
    rating: number[];
    housingType: HousingType[];
    rooms: number[];
    guests: number[];
    price: number[];
    features: HousingFeature[];
    user: User[];
    reviewsAmount: number[];
    location: HousingLocation[];
  };
