import { DocumentType } from '@typegoose/typegoose';
import { City, DocumentExists } from '../../types/index.js';
import { HousingEntity } from './housing.entity.js';
import { CreateHousingDto, UpdateHousingDto } from './dto/index.js';
export interface HousingService extends DocumentExists {
  create(dto: CreateHousingDto): Promise<DocumentType<HousingEntity>>;
  findById(offerId: string, userId?: string): Promise<DocumentType<HousingEntity> | null>;
  find(): Promise<DocumentType<HousingEntity>[]>;
  deleteById(offerId: string): Promise<DocumentType<HousingEntity> | null>;
  updateById(offerId: string, dto: UpdateHousingDto): Promise<DocumentType<HousingEntity> | null>;
  incCommentCount(offerId: string): Promise<DocumentType<HousingEntity> | null>;
  findPremiumByCity(city: City): Promise<DocumentType<HousingEntity>[]>;
  findFavorite(userId: string): Promise<DocumentType<HousingEntity>[]>;
  exists(offerId: string): Promise<boolean>;
  updateByIdOnNewComment(id: string, newRating: number): Promise<DocumentType<HousingEntity> | null>;
}
