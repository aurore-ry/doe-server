import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto, LoginUserDto } from './users.user.dto';
import { compare, genSalt, hash } from 'bcrypt';

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
    const salt = await genSalt(10);
    const password = await hash(userDto.password, salt);
    return this.prisma.user.create({
      data: {
        username: userDto.username,
        email: userDto.email,
        password,
        salt,
      },
    });
  }

  async login(userDto: LoginUserDto): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: {
        username: userDto.username,
      },
    });

    console.log('b');

    if (!user) {
      throw new NotFoundException(
        `Not user found for username: ${userDto.username}`,
      );
    }
    return compare(userDto.password, user.password);
  }
}
