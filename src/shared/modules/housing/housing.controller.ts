import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BaseController, HttpMethod, HttpError } from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { City,Component } from '../../types/index.js';
import { HousingService } from './housing-service.interface.js';
import { fillDTO } from '../../helpers/index.js';
import { HousingRdo, DetailedHousingRdo } from './rdo/index.js';
import { CreateHousingDto } from './dto/create-housing.dto.js';
import { GetHousingRequestType } from './types/get-detailed-housing.type.js';

@injectable()
export class HousingController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.HousingService) private readonly housingService: HousingService,

  ) {
    super(logger);

    this.logger.info('Register routes for HousingController...');

    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.getDetailedHousing,
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
    });
    this.addRoute({
      path: '/premium',
      method: HttpMethod.Get,
      handler: this.getPremium,
    });
    this.addRoute({
      path: '/favorites',
      method: HttpMethod.Get,
      handler: this.getFavorites,
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const housings = await this.housingService.find();
    const responseData = fillDTO(HousingRdo, housings);
    this.ok(res, responseData);
  }

  public async create(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateHousingDto>,
    res: Response
  ): Promise<void> {

    const result = await this.housingService.create(body);
    this.created(res, fillDTO(HousingRdo, result));
  }

  public async getDetailedHousing(req: GetHousingRequestType, res: Response) {
    const { params: { offerId }} = req;
    const offer = await this.housingService.findById(offerId);
    if (offer) {
      return this.ok(res, fillDTO(DetailedHousingRdo, offer));
    }

    throw new HttpError(
      StatusCodes.NOT_FOUND,
      `Offer with id ${offerId} not found.`,
      'HousingController'
    );
  }

  public async delete(req: GetHousingRequestType, res: Response) {
    const { params: { offerId }} = req;

    if(offerId){
      await this.housingService.deleteById(offerId);

      return this.ok(res, null);
    }

    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      `No data or access for deleting offer ${offerId}.`,
      'HousingController'
    );
  }

  public async update(req: GetHousingRequestType, res: Response) {
    const { params: { offerId }, body } = req;

    if (offerId) {
      const result = await this.housingService.updateById(offerId, body);
      return this.ok(res, fillDTO(DetailedHousingRdo, result));
    }

    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      `Can't update offer ${offerId}.`,
      'OfferController'
    );
  }


  public async getPremium(req: GetHousingRequestType, res: Response){
    const { query: { city } } = req;

    if(typeof city === 'string' && Object.keys(City).includes(city)) {
      const result = await this.housingService.findPremiumByCity(
        City[city as keyof typeof City]);

      return this.ok(res, fillDTO(HousingRdo, result));
    }

    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      `No offers found for city ${city}.`,
      'HousingController'
    );
  }

  public async getFavorites(_req: GetHousingRequestType, res: Response){
    const result = await this.housingService.findFavorite();
    return this.ok(res, fillDTO(HousingRdo, result));
  }
}
