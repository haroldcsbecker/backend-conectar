import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

const fakeUsers = [
  {
    id: 1,
    email: 'hcsb20@gmail.com',
    password: 'pass',
  },
  {
    id: 2,
    email: 'hcsb20',
    password: 'pass',
  },
];
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  validateUser({ email, password }: AuthPayloadDto) {
    const findUser = fakeUsers.find((user) => user.email === email);
    if (!findUser) {
      return null;
    }
    if (findUser.password === password) {
      const { password, ...user } = findUser;
      return this.jwtService.sign(user);
    }
  }
}
