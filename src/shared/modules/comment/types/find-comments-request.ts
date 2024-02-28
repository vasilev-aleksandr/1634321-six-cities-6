import { Request } from 'express';
import { ParamOfferId } from '../../housing/index.js';

export type FindCommentsRequest = Request<ParamOfferId>
