import { Injectable } from '@nestjs/common';
import { UserEntity } from '../output';
import { CreateUserInput } from '../input';
import { UsersRepository } from '../repositories';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) {}

  public async createUser(payload: CreateUserInput): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    return this.repository.create({
      ...payload,
      password: hashedPassword,
    });
  }
}
