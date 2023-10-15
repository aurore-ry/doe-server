import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './users.user.dto';
import { hash } from 'bcrypt';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface FormatLogin extends Partial<User> {
  username: string;
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(userDto: CreateUserDto): Promise<User> {
    const checkIfUserAlreadyExist = await this.prisma.user.findFirst({
      where: {
        username: userDto.username,
        email: userDto.email,
      },
    });
    if (checkIfUserAlreadyExist) {
      throw new HttpException('user_already_exist', HttpStatus.CONFLICT);
    }
    const password = await hash(userDto.password, 10);
    return this.prisma.user.create({
      data: {
        username: userDto.username,
        email: userDto.email,
        password,
      },
    });
  }
}
