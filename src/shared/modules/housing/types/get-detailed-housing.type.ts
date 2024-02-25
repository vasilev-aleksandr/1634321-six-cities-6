import { Request } from 'express';
import { RequestBody } from '../../../libs/rest/index.js';
import { DetailedHousingRdo } from '../rdo/detailed-housing.rdo.js';
import { ParamsDictionary } from 'express-serve-static-core';

type ParamOfferId = {
    offerId: string;
  } | ParamsDictionary;

export type GetHousingRequestType = Request<ParamOfferId, RequestBody, DetailedHousingRdo>;
