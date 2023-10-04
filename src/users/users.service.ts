import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(createUserDto.password, salt);
    createUserDto.password = password;
    return this.userRepository.save(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(query: FindOneOptions<User>) {
    return this.userRepository.findOne(query);
  }



  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne({
      where: { id },
    });

    const users = await this.find({});
    if (updateUserDto.name) user.name = updateUserDto.name;
    if (updateUserDto.username) user.username = updateUserDto.username;
    if (updateUserDto.phone) user.phone = updateUserDto.phone;
    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash(updateUserDto.password, salt);
      user.password = password;
    }
    if (updateUserDto.access) user.access = updateUserDto.access;

    //В Самый низ!!!
    // if (updateUserDto.count > 0) {
    //   users.forEach((currUser) => {
    //     currUser.count = currUser.count + 1;
    //     this.userRepository.save(currUser);
    //   });

    // }
    // if (updateUserDto.count === 0) {
    //   user.count = 0;
    // }
    return this.userRepository.save(user);
  }

  async findByUsername(query: FindOneOptions<User>) {
    const user = await this.userRepository.findOne(query);
    return user;
  }

  find(query: FindManyOptions<User>) {
    return this.userRepository.find(query);
  }

  findBy(query: FindOptionsWhere<User> | FindOptionsWhere<User>[]) {
    return this.userRepository.findBy(query);
  }

  async remove(id: number) {
    const user = await this.findOne({
      where: { id },
    });
    if (!user)
      throw new NotFoundException('Такого пользователя не существует!');
    return await this.userRepository.delete(id);
  }
}
