import { Injectable, NotFoundException } from '@nestjs/common';
import { LessThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { QueryDto } from './dto/query.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async inactives() {
    const today = new Date();
    const inactiveUsers = new Date(today.setDate(today.getDate() - 30));

    return await this.usersRepository.find({
      where: {
        lastLogin: LessThan(inactiveUsers),
      },
    });
  }

  async findAll(query: QueryDto) {
    const users = this.usersRepository.createQueryBuilder();

    if (query.role) {
      users.where('User.role = :role').setParameter('role', query.role);
    }

    if (query.sortBy) {
      users.orderBy(query.sortBy, query.order);
    }

    return await users.getMany();
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException();
    }

    return this.usersRepository.remove(user);
  }
}
