import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';

import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';

import { HousingService } from './housing-service.interface.js';
import { HousingEntity } from './housing.entity.js';
import { CreateHousingDto } from './index.js';

@injectable()
export class DefaultHousingService implements HousingService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.HousingModel)
    private readonly offerModel: types.ModelType<HousingEntity>
  ) {}

  public async create(dto: CreateHousingDto): Promise<DocumentType<HousingEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`Новое объявление создано: ${dto.title}`);

    return result;
  }

  public async findById(
    offerId: string
  ): Promise<DocumentType<HousingEntity> | null> {
    return this.offerModel.findById(offerId).exec();
  }
}
