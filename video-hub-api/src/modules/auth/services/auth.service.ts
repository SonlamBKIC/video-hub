import { UsersRepository } from '@modules/users/repositories';
import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginInput } from '../input';
import * as bcrypt from 'bcrypt';
import { LoginOutput } from '../output';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async login(payload: LoginInput): Promise<LoginOutput> {
    const user = await this.userRepository.findOneByUsername(payload.username);

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const isPasswordValid = await bcrypt.compare(payload.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const jwtPayload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(jwtPayload),
    };
  }
}
