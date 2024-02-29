import { IsArray, IsEnum, IsInt, IsMongoId, Max, MaxLength, Min, MinLength, IsBoolean, IsObject, ValidateNested } from 'class-validator';
import { UpdateHousingValidationMessage } from './update-housing.message.js';
import { HousingType, HousingFeature, HousingLocation, City } from '../../../types/index.js';

export class UpdateHousingDto {
  @MinLength(10, { message: UpdateHousingValidationMessage.title.minLength })
  @MaxLength(100, { message: UpdateHousingValidationMessage.title.maxLength })
  public title?: string;

  @MinLength(20, { message: UpdateHousingValidationMessage.description.minLength })
  @MaxLength(1024, { message: UpdateHousingValidationMessage.description.maxLength })
  public description?: string;

  @IsEnum(City, { message: UpdateHousingValidationMessage.city.invalid })
  public city?: City;

  @MaxLength(256, { message: UpdateHousingValidationMessage.preview.maxLength })
  public preview?: string;

  @IsArray({ message: UpdateHousingValidationMessage.images.invalidFormat })
  @MaxLength(256, { each: true, message: UpdateHousingValidationMessage.images.maxLength })
  public images?: string[];

  @IsBoolean({ message: UpdateHousingValidationMessage.isPremium.invalidFormat })
  public isPremium?: boolean;

  @IsEnum(HousingType, { message: UpdateHousingValidationMessage.housingType.invalid })
  public housingType?: HousingType;

  @IsInt({ message: UpdateHousingValidationMessage.rooms.invalidFormat })
  @Min(1, { message: UpdateHousingValidationMessage.rooms.minValue })
  @Max(8, { message: UpdateHousingValidationMessage.rooms.maxValue })
  public rooms?: number;

  @IsInt({ message: UpdateHousingValidationMessage.guests.invalidFormat })
  @Min(1, { message: UpdateHousingValidationMessage.guests.minValue })
  @Max(10, { message: UpdateHousingValidationMessage.guests.maxValue })
  public guests?: number;

  @IsInt({ message: UpdateHousingValidationMessage.price.invalidFormat })
  @Min(1, { message: UpdateHousingValidationMessage.price.minValue })
  @Max(10, { message: UpdateHousingValidationMessage.price.maxValue })
  public price?: number;

  @IsArray({ message: UpdateHousingValidationMessage.features.invalidFormat })
  public features?: HousingFeature[];

  @IsObject({ message: UpdateHousingValidationMessage.location.invalidFormat })
  public location?: HousingLocation;
}
