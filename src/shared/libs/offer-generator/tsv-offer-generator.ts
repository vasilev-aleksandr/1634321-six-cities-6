import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';
import { HousingType, HousingFeature, HousingLocation } from '../../types/housing.type.js';
import { User } from '../../types/user.type.js';

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.title);
    const description = getRandomItem<string>(this.mockData.description);
    const city = getRandomItem<string>(this.mockData.city);
    const preview = getRandomItem<string>(this.mockData.preview);
    const images = getRandomItems<string>(this.mockData.images).join(';');
    const isPremium = getRandomItem<boolean>(this.mockData.isPremium);
    const isFavorite = getRandomItem<boolean>(this.mockData.isFavorite);
    const rating = getRandomItem<number>(this.mockData.rating);
    const housingType = getRandomItem<HousingType>(this.mockData.housingType);
    const rooms = getRandomItem<number>(this.mockData.rooms);
    const guests = getRandomItem<number>(this.mockData.guests);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const features = getRandomItem<HousingFeature>(this.mockData.features);
    const author = Object.values(getRandomItem<User>(this.mockData.user)).join(';');
    const reviewsAmount = getRandomItem<number>(this.mockData.reviewsAmount);
    const location = getRandomItem<HousingLocation>(this.mockData.location);

    const postDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();


    return [
      title, description, postDate, city, preview, images, isPremium, isFavorite, rating, housingType, rooms, guests, price, features, author, reviewsAmount, location
    ].join('\t');
  }
}
