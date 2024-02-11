import { HousingType, HousingFeature, HousingLocation } from '../../../types/index.js';

export class UpdateHousingDto {
  public title?: string;
  public description?: string;
  public postDate?: Date;
  public city?: string;
  public preview?: string;
  public images?: string[];
  public housingType?: HousingType;
  public rooms?: number;
  public guests?: number;
  public price?: number;
  public features?: HousingFeature[];
  public location?: HousingLocation;
}
