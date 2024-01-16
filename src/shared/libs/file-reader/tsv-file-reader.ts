import { FileReader } from './tsv-file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { User, UserStatus, Housing, HousingType, HousingFeature, HousingLocation } from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  private parseLocation(location: string): HousingLocation {
    const [latitude, longitude] = location.split(' ');

    return {
      latitude: Number(latitude),
      longitude:Number(longitude),
    };
  }

  private parseUser(user: string): User {
    const [name, email, avatarPath, password, status] = user.split(';');
    return {
      name,
      email,
      avatarPath,
      password,
      userStatus: status as UserStatus,
    };
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, 'utf-8');
  }

  public toArray(): Housing[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([title, description, postDate, city, preview, images, isPremium, isFavorite, rating, housingType, rooms, guests, price, features, user, reviewsAmount, location]) => ({
        title,
        description,
        postDate: new Date(postDate),
        city,
        preview,
        images: images.split(' '),
        isPremium: isPremium === 'true',
        isFavorite: isFavorite === 'true',
        rating: Number(rating),
        housingType: housingType as HousingType,
        rooms: Number(rooms),
        guests: Number(guests),
        price: Number(price),
        features: features.split(',') as HousingFeature[],
        user: this.parseUser(user),
        reviewsAmount: Number(reviewsAmount),
        location: this.parseLocation(location),
      }));
  }
}
