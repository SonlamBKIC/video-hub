import { Injectable } from '@nestjs/common';
import { CreateUserInput } from '../input';
import { UserMongoModel } from '../models';
import { UserEntity } from '../output';

@Injectable()
export class UsersRepository {
  private model = UserMongoModel;

  constructor() {}

  public async create(user: CreateUserInput): Promise<UserEntity> {
    const createdUser = (await this.model.create(user)).toJSON({ virtuals: true });
    return createdUser;
  }

  public async findOneByUsername(username: string): Promise<UserEntity | undefined> {
    const user = await this.model.findOne({
      username,
    });
    return user ? user.toJSON({ virtuals: true }) : undefined;
  }
}
