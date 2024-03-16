import { Controller, Get, Post, Request } from '@nestjs/common';
import { UsersService } from '../services';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(): string {
    return 'All users';
  }

  @Get(':id')
  getUser(@Request() req: any): string {
    console.log('Authenticated request of ', req.authUser);
    return 'One user';
  }

  @Post()
  createUser(): string {
    return 'Create user';
  }
}
