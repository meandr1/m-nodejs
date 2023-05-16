import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async addUser(createUserDto: CreateUserDto) {
    if (await this.findUser(createUserDto.name)) {
      throw new ConflictException('User already exists');
    }
    const user: User = plainToInstance(User, createUserDto);
    return await this.usersRepository.save(user);
  }

  async findUser(name: string) {
    const user = await this.usersRepository.findOne({
      where: { name }
    });
    return user;
  }
}
