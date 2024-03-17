import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from '@modules/users/services';
import { UserEntity } from '@modules/users/output';
import { CreateUserInput } from '@modules/users/input';
import { AuthService } from '@modules/auth/services/auth.service';
import { LoginOutput } from '@modules/auth/output';
import { Public } from '@modules/auth/decorators';
import { LoginInput } from '@modules/auth/input';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @Post('/login')
  login(@Body() payload: LoginInput): Promise<LoginOutput> {
    const result = this.authService.login(payload);
    return result;
  }

  @Public()
  @Post('/register')
  async register(@Body() payload: CreateUserInput): Promise<UserEntity> {
    const user = await this.usersService.createUser(payload);
    return user;
  }
}
