import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { createOffer, getErrorMessage, getMongoURI } from '../../shared/helpers/index.js';
import { UserService } from '../../shared/modules/user/user-service.interface.js';
import { DefaultHousingService, HousingModel, HousingService } from '../../shared/modules/housing/index.js';
import { DatabaseClient, MongoDatabaseClient } from '../../shared/libs/database-client/index.js';
import { Logger } from '../../shared/libs/logger/index.js';
import { ConsoleLogger } from '../../shared/libs/logger/console.logger.js';
import { DefaultUserService, UserModel } from '../../shared/modules/user/index.js';
import { DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD } from './command.constant.js';
import { Housing } from '../../shared/types/index.js';

export class ImportCommand implements Command {
  private userService: UserService;
  private housingService: HousingService;
  private databaseClient: DatabaseClient;
  private logger: Logger;
  private salt: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.housingService = new DefaultHousingService(this.logger, HousingModel);
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  }

  private async saveOffer(offer: Housing) {
    const user = await this.userService.findOrCreate({
      ...offer.authorId,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    await this.housingService.create({
      title: offer.title,
      authorId: user.id,
      description: offer.description,
      postDate: offer.postDate,
      city: offer.city,
      preview: offer.preview,
      images: offer.images,
      isPremium: offer.isPremium,
      isFavorite: offer.isFavorite,
      rating: offer.rating,
      housingType: offer.housingType,
      rooms: offer.rooms,
      guests: offer.guests,
      price: offer.price,
      features: offer.features,
      user: user.id,
      reviewsAmount: offer.reviewsAmount,
      location: offer.location,
    });

  }

  public getName(): string {
    return '--import';
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseClient.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {

      console.error(`Can't import data from file: ${filename}`);
      console.error(getErrorMessage(error));
    }
  }
}
