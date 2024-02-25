import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { Component } from '../../types/index.js';
import { HousingService } from './housing-service.interface.js';
import { DefaultHousingService } from './default-housing.service.js';
import { HousingEntity, HousingModel } from './housing.entity.js';
import { Controller } from '../../libs/rest/index.js';
import { HousingController } from './housing.controller.js';

export const createHousingContainer = () => {
  const housingContainer = new Container();

  housingContainer.bind<HousingService>(Component.HousingService).to(DefaultHousingService);
  housingContainer
    .bind<types.ModelType<HousingEntity>>(Component.HousingModel)
    .toConstantValue(HousingModel);
  housingContainer.bind<Controller>(Component.HousingController).to(HousingController).inSingletonScope();


  return housingContainer;
};
