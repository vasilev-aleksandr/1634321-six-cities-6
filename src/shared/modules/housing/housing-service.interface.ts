import { DocumentType } from '@typegoose/typegoose';

import { HousingEntity } from './housing.entity.js';
import { CreateHousingDto, UpdateHousingDto } from './dto/index.js';
export interface HousingService {
  create(dto: CreateHousingDto): Promise<DocumentType<HousingEntity>>;
  findById(id: string): Promise<DocumentType<HousingEntity> | null>;
  find(): Promise<DocumentType<HousingEntity>[]>;
  deleteById(id: string): Promise<DocumentType<HousingEntity> | null>;
  updateById(id: string, dto: UpdateHousingDto): Promise<DocumentType<HousingEntity> | null>;
  incCommentCount(id: string): Promise<DocumentType<HousingEntity> | null>;
  findNew(count: number): Promise<DocumentType<HousingEntity>[]>;
  findDiscussed(count: number): Promise<DocumentType<HousingEntity>[]>;
  exists(documentId: string): Promise<boolean>;
}
