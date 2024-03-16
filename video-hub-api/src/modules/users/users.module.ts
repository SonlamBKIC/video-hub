import { Module } from '@nestjs/common';
import { UsersController } from './controllers';
import { UsersService } from './services/users.service';
import { UsersRepository } from './repositories';

@Module({
  controllers: [UsersController],
  providers: [UsersRepository, UsersService],
  exports: [UsersRepository, UsersService],
})
export class UsersModule {}
