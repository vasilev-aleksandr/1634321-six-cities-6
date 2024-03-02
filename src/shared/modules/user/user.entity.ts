import { defaultClasses, getModelForClass, prop, modelOptions, Ref } from '@typegoose/typegoose';
import { User, UserStatus } from '../../types/index.js';
import { HousingEntity } from '../housing/index.js';
import { createSHA256 } from '../../helpers/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ required: true, default: '' })
  public name: string;

  @prop({ unique: true, required: true })
  public email: string;

  @prop({ required: false })
  public avatarPath: string;

  @prop({ required: true, default: '' })
  public password: string;

  @prop({ required: true, default: 'regular' })
  public userStatus: UserStatus;

  @prop({
    default: [],
    ref: () => UserEntity,
  })
  public favorites: Ref<HousingEntity>[];

  constructor(userData: User) {
    super();

    this.userStatus = userData.userStatus;
    this.email = userData.email;
    this.avatarPath = userData.avatarPath;
    this.name = userData.name;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
