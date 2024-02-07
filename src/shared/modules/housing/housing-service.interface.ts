import { DocumentType } from '@typegoose/typegoose';

import { HousingEntity } from './housing.entity.js';
import { CreateHousingDto } from './dto/index.js';

export interface HousingService {
  create(dto: CreateHousingDto): Promise<DocumentType<HousingEntity>>;
  findById(id: string): Promise<DocumentType<HousingEntity> | null>;
}
