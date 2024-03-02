import { inject, injectable } from 'inversify';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  BaseController,
  HttpError,
  HttpMethod,
  ValidateObjectIdMiddleware,
  ValidateDtoMiddleware,
  PrivateRouteMiddleware,
} from '../../libs/rest/index.js';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { CommentService } from './comment-service.interface.js';
import { HousingService } from '../housing/index.js';
import { fillDTO } from '../../helpers/index.js';
import { CommentRdo } from './rdo/comment.rdo.js';
import { CreateCommentRequest } from './types/create-comment-request.type.js';
import { FindCommentsRequest } from './types/find-comments-request.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';

@injectable()
export default class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService) private readonly commentService: CommentService,
    @inject(Component.HousingService) private readonly housingService: HousingService,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController…');
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateCommentDto),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.findByOfferId,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });

  }

  public async create(
    { body, tokenPayload }: CreateCommentRequest,
    res: Response
  ): Promise<void> {

    if (! await this.housingService.exists(body.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${body.offerId} not found.`,
        'CommentController'
      );
    }

    console.log(tokenPayload);

    const comment = await this.commentService.create({ ...body, authorId: tokenPayload.id });

    const newRating = await this.commentService.getUpdatedAverageRating(body.offerId);
    const updatedOffer = await this.housingService.updateByIdOnNewComment(body.offerId, newRating);

    if (!updatedOffer) {
      throw new HttpError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        `Offer with id ${body.offerId} was not updated.`,
        'CommentController',
      );
    }

    this.created(res, fillDTO(CommentRdo, comment));
  }

  public async findByOfferId(
    { params: { offerId } }: FindCommentsRequest,
    res: Response,
  ) {
    if (!(await this.housingService.exists(offerId))) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found.`,
        'CommentController',
      );
    }

    const comments = await this.commentService.findByOfferId(offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }
}
