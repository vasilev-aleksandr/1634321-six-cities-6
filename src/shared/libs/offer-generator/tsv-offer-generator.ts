import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';

const MIN_PRICE = 100;
const MAX_PRICE = 100000;
const MIN_ROOMS = 1;
const MAX_ROOMS = 8;
const MIN_GUESTS = 1;
const MAX_GUESTS = 10;
const MIN_RATE = 1;
const MAX_RATE = 2;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem(this.mockData.title);
    const description = getRandomItem(this.mockData.description);
    const cityData = getRandomItem(this.mockData.city);
    const { name: city } = cityData;
    const preview = getRandomItem(this.mockData.preview);
    const images = getRandomItems(this.mockData.images).join(';');
    const isPremium = Boolean(generateRandomValue(0, 1));
    const isFavorite = Boolean(generateRandomValue(0, 1));
    const rating = generateRandomValue(MIN_RATE, MAX_RATE, 1).toString();
    const housingType = getRandomItem(this.mockData.housingType);
    const rooms = generateRandomValue(MIN_ROOMS, MAX_ROOMS).toString();
    const guests = generateRandomValue(MIN_GUESTS, MAX_GUESTS).toString();
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const features = getRandomItems(this.mockData.features).join(',');
    const author = Object.values(getRandomItem(this.mockData.user)).join(';');
    const reviewsAmount = generateRandomValue(1, 100).toString();
    const location = Object.values(cityData.location).join(' ');
    const postDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    return [
      title, description, postDate, city, preview, images, isPremium, isFavorite, rating, housingType, rooms, guests, price, features, author, reviewsAmount, location
    ].join('\t');
  }
}
