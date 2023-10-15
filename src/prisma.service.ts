import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface FormatLogin extends Partial<User> {
  login: string;
}

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect;
  }
}
