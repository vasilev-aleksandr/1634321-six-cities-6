import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';

import { Component } from '../../types/index.js';

import { HousingService } from './housing-service.interface.js';
import { DefaultHousingService } from './default-housing.service.js';
import { HousingEntity, HousingModel } from './housing.entity.js';

export const createHousingContainer = () => {
  const offerContainer = new Container();

  offerContainer.bind<HousingService>(Component.HousingService).to(DefaultHousingService);
  offerContainer
    .bind<types.ModelType<HousingEntity>>(Component.HousingModel)
    .toConstantValue(HousingModel);

  return offerContainer;
};
