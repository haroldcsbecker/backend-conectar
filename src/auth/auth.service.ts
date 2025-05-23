import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: AuthPayloadDto) {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      return null;
    }

    const { password: dbPassword, ...loginData } = user;
    const isPasswordValid = await bcrypt.compare(password, dbPassword);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }
    await this.userRepository.update(user.id, { lastLogin: new Date() });

    return this.jwtService.sign(loginData);
  }

  async register({ name, email, password, role }: CreateUserDto) {
    const user = await this.userRepository.findOneBy({ email });

    if (user) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      name,
      email,
      role,
      password: hashedPassword,
    });

    const { password: pass, ...createdUser } =
      await this.userRepository.save(newUser);

    return createdUser;
  }
}
