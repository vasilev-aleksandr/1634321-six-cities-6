import { Expose, Type } from 'class-transformer';
import { UserRdo } from '../../user/rdo/user.rdo.js';
import { City, HousingType, HousingFeature, HousingLocation } from '../../../types/index.js';

export class DetailedHousingRdo {
  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public postDate: Date;

  @Expose()
  public city: City;

  @Expose()
  public preview: string;

  @Expose()
  public images: string[];

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public housingType: HousingType;

  @Expose()
  public rooms: number;

  @Expose()
  public guests: number;

  @Expose()
  public price: number;

  @Expose()
  public features: HousingFeature[];

  @Expose({ name: 'authorId'})
  @Type(() => UserRdo)
  public authorId: UserRdo;

  @Expose()
  public reviewsAmount: number;

  @Expose()
  public location: HousingLocation;
}
