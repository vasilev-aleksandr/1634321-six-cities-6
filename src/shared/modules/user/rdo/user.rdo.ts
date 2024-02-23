import { Expose } from 'class-transformer';

export class UserRdo {
  @Expose()
  public name: string;

  @Expose()
  public email: string ;

  @Expose()
  public avatarPath: string;

  @Expose()
  public password: string;

  @Expose()
  public userStatus: string;
}
