import { DocumentType } from '@typegoose/typegoose';
import { City } from '../../types/index.js';
import { HousingEntity } from './housing.entity.js';
import { CreateHousingDto, UpdateHousingDto } from './dto/index.js';
export interface HousingService {
  create(dto: CreateHousingDto): Promise<DocumentType<HousingEntity>>;
  findById(offerId: string): Promise<DocumentType<HousingEntity> | null>;
  find(): Promise<DocumentType<HousingEntity>[]>;
  deleteById(offerId: string): Promise<DocumentType<HousingEntity> | null>;
  updateById(offerId: string, dto: UpdateHousingDto): Promise<DocumentType<HousingEntity> | null>;
  incCommentCount(offerId: string): Promise<DocumentType<HousingEntity> | null>;
  findPremiumByCity(city: City): Promise<DocumentType<HousingEntity>[]>;
  findFavorite(): Promise<DocumentType<HousingEntity>[]>;
  exists(offerId: string): Promise<boolean>;
}
