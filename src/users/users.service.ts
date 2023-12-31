import {
  BadRequestException,
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

    if (userDto.password !== userDto.passwordConfirm) {
      throw new BadRequestException(
        'Password and Confirmation Password must match',
      );
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

  async login(userDto: LoginUserDto): Promise<null | User> {
    const user = await this.prisma.user.findUnique({
      where: {
        username: userDto.username,
      },
    });

    if (!user) {
      throw new NotFoundException(
        `Not user found for username: ${userDto.username}`,
      );
    }

    if (compare(userDto.password, user.password)) {
      return user;
    }

    return null;
  }

  async getUser(username: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  async getUserById(userId: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }
}
