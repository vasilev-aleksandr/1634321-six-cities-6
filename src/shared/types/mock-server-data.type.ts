import { User, HousingType, HousingFeature, HousingLocation, City } from './index.js';

export type MockServerData = {
    title: string[];
    description: string[];
    postDate: Date[];
    city: City[];
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
