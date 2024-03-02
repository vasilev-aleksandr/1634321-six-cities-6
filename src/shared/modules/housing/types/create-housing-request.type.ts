import { Request } from 'express';
import { RequestBody, RequestParams } from '../../../libs/rest/index.js';
import { CreateHousingDto } from '../index.js';

export type CreateHousingRequestType = Request<RequestParams, RequestBody, CreateHousingDto>;
