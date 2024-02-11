import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { HousingEntity } from '../housing/index.js';
import { UserEntity } from '../user/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public text: string;

  @prop({ required: true })
  public postDate: Date;

  @prop({
    ref: HousingEntity,
    required: true
  })
  public offerId: Ref<HousingEntity>;

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId: Ref<UserEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
