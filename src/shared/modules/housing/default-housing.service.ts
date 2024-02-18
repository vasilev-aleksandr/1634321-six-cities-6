import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { Component, SortType } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { HousingService } from './housing-service.interface.js';
import { HousingEntity } from './housing.entity.js';
import { CreateHousingDto, UpdateHousingDto } from './index.js';
import { MAX_CATEGORIES_COUNT } from './housing.constant.js';
@injectable()
export class DefaultHousingService implements HousingService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.HousingModel)
    private readonly housingModel: types.ModelType<HousingEntity>
  ) {}

  public async create(dto: CreateHousingDto): Promise<DocumentType<HousingEntity>> {
    const result = await this.housingModel.create(dto);
    this.logger.info(`Новое объявление создано: ${dto.title}`);

    return result;
  }

  public async findById(
    offerId: string
  ): Promise<DocumentType<HousingEntity> | null> {
    return this.housingModel
      .findById(offerId)
      .populate(['userId'])
      .exec();
  }

  public async find(): Promise<DocumentType<HousingEntity>[]> {
    return this.housingModel
      .aggregate([
        {
          $lookup: {
            from: 'comments',
            let: { housingId: '$_id'},
            pipeline: [
              { $match: { $expr: { $eq: ['$$housingId', '$offerId'] } } },
              { $group: { _id: null, averageRating: {$avg: '$rating'}, reviewsAmount: { $sum: 1}}}
            ],
            as: 'comments'
          },
        },
        { $addFields:
          {
            reviewsAmount: { $arrayElemAt: ['$comments.reviewsAmount', 0]},
            averageRating: { $arrayElemAt: ['$comments.averageRating', 0]}
          },
        },
        { $unset: 'comments' },
        { $limit: MAX_CATEGORIES_COUNT },
      ]).exec();
  }

  public async deleteById(id: string): Promise<DocumentType<HousingEntity> | null> {
    return this.housingModel
      .findByIdAndDelete(id)
      .exec();
  }

  public async updateById(id: string, dto: UpdateHousingDto): Promise<DocumentType<HousingEntity> | null> {
    return this.housingModel
      .findByIdAndUpdate(id, dto, {new: true})
      .populate(['userId'])
      .exec();
  }

  public async exists(id: string): Promise<boolean> {
    return (await this.housingModel
      .exists({_id: id})) !== null;
  }

  public async incCommentCount(id: string,): Promise<DocumentType<HousingEntity> | null> {
    return this.housingModel
      .findByIdAndUpdate(id, {'$inc': {
        reviewsAmount: 1,
      }}).exec();
  }

  public async findNew(count: number): Promise<DocumentType<HousingEntity>[]> {
    return this.housingModel
      .find()
      .sort({ createdAt: SortType.Down })
      .limit(count)
      .populate(['userId'])
      .exec();
  }

  public async findDiscussed(count: number): Promise<DocumentType<HousingEntity>[]> {
    return this.housingModel
      .find()
      .sort({ reviewsAmount: SortType.Down })
      .limit(count)
      .populate(['userId'])
      .exec();
  }
}
