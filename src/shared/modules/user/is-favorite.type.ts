import { Request } from 'express';
import { RequestBody, RequestParams } from '../../libs/rest/index.js';
import { IsFavoriteDto } from './dto/is-favorite.dto.js';
export type IsFavoriteRequest = Request<RequestParams, RequestBody, IsFavoriteDto>;
