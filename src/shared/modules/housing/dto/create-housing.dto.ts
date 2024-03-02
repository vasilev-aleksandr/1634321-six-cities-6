import { IsArray, IsDateString, IsEnum, IsInt, Max, MaxLength, Min, MinLength, IsBoolean, IsObject, ValidateNested } from 'class-validator';
import { CreateHousingValidationMessage } from './create-housing.messages.js';
import {
  HousingType,
  HousingFeature,
  HousingLocation,
  City,
} from '../../../types/index.js';

export class CreateHousingDto {
  public authorId: string;

  @MinLength(10, { message: CreateHousingValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateHousingValidationMessage.title.maxLength })
  public title: string;

  @MinLength(20, { message: CreateHousingValidationMessage.description.minLength })
  @MaxLength(1024, { message: CreateHousingValidationMessage.description.maxLength })
  public description: string;

  @IsDateString({}, { message: CreateHousingValidationMessage.postDate.invalidFormat })
  public postDate: Date;

  @IsEnum(City, { message: CreateHousingValidationMessage.city.invalid })
  public city: City;

  @MaxLength(256, { message: CreateHousingValidationMessage.preview.maxLength })
  public preview: string;

  @IsArray({ message: CreateHousingValidationMessage.images.invalidFormat })
  @MaxLength(256, { each: true, message: CreateHousingValidationMessage.images.maxLength })
  public images: string[];

  @IsBoolean({ message: CreateHousingValidationMessage.isPremium.invalidFormat })
  public isPremium: boolean;

  @IsEnum(HousingType, { message: CreateHousingValidationMessage.housingType.invalid })
  public housingType: HousingType;

  @IsInt({ message: CreateHousingValidationMessage.rooms.invalidFormat })
  @Min(1, { message: CreateHousingValidationMessage.rooms.minValue })
  @Max(8, { message: CreateHousingValidationMessage.rooms.maxValue })
  public rooms: number;

  @IsInt({ message: CreateHousingValidationMessage.guests.invalidFormat })
  @Min(1, { message: CreateHousingValidationMessage.guests.minValue })
  @Max(10, { message: CreateHousingValidationMessage.guests.maxValue })
  public guests: number;

  @IsInt({ message: CreateHousingValidationMessage.price.invalidFormat })
  @Min(100, { message: CreateHousingValidationMessage.price.minValue })
  @Max(100000, { message: CreateHousingValidationMessage.price.maxValue })
  public price: number;

  @IsArray({ message: CreateHousingValidationMessage.features.invalidFormat })
  public features: HousingFeature[];

  @IsObject({ message: CreateHousingValidationMessage.location.invalidFormat })
  @ValidateNested()
  public location: HousingLocation;
}
