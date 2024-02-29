import { inject, injectable } from 'inversify';
import * as mongoose from 'mongoose';
import { CommentService } from './comment-service.interface.js';
import { Component, SortType } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { CommentEntity } from './comment.entity.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { COMMENTS_AMOUNT_LIMIT } from './comment.constant.js';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);

    this.logger.info(`Comment with id ${comment.id} was created`);

    console.log(comment);

    const commentWithAuthor = await this.commentModel.aggregate([
      { $match: { _id: comment._id } },
      { $lookup: { from: 'users', localField: 'authorId', foreignField: '_id', as: 'author' } },
      { $unwind: '$author' },
      { $limit: 1 },
    ]).exec();

    console.log(commentWithAuthor);

    return commentWithAuthor[0];
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    const result = await this.commentModel
      .aggregate<types.DocumentType<CommentEntity>>([
        { $match: { offerId: new mongoose.Types.ObjectId(offerId) } },
        { $lookup: { from: 'users', localField: 'authorId', foreignField: '_id', as: 'author' } },
        { $unwind: '$author' },
      ])
      .limit(COMMENTS_AMOUNT_LIMIT)
      .sort({ createdAt: SortType.Down })
      .exec();

    console.log(offerId);

    this.logger.info(`Number of comments for offer ${offerId}: ${result.length}`);
    return result;
  }

  public async getUpdatedAverageRating(offerId: string): Promise<number> {
    const [{ rating }] = await this.commentModel.aggregate([
      { $match: { offerId: new mongoose.Types.ObjectId(offerId) } },
      {
        $group: {
          _id: null,
          totalRating: { $sum: '$rating' },
          totalComments: { $sum: 1 },
        },
      },
      {
        $project: {
          rating: { $divide: ['$totalRating', '$totalComments'] },
        },
      },
    ]);

    return Number(rating.toFixed(1));
  }
}
