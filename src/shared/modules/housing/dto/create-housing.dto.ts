import {
  HousingType,
  HousingFeature,
  HousingLocation,
  User,
} from '../../../types/index.js';

export class CreateHousingDto {
  public authorId: string;
  public title: string;
  public description: string;
  public postDate: Date;
  public city: string;
  public preview: string;
  public images: string[];
  public isPremium: boolean;
  public isFavorite: boolean;
  public rating: number;
  public housingType: HousingType;
  public rooms: number;
  public guests: number;
  public price: number;
  public features: HousingFeature[];
  public user: User;
  public reviewsAmount: number;
  public location: HousingLocation;
}
