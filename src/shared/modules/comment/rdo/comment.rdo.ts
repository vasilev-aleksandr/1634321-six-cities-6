import { Expose, Type } from 'class-transformer';
import { UserRdo } from '../../user/rdo/user.rdo.js';

export class CommentRdo {
  @Expose()
  public id: string;

  @Expose()
  public text: string;

  @Expose()
  public rating: number;

  @Type(() => UserRdo)
  @Expose()
  public author: UserRdo;

  @Expose()
  @Type(() => String)
  public offerId: string;
}
