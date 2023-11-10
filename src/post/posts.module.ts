import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PostsService } from './posts.service';
import { IsAuthenticatedGuard } from 'src/common/guards/IsAuthenticatedGuard';
import { PostController } from './posts.controller';

@Module({
  controllers: [PostController],
  providers: [PrismaService, PostsService, IsAuthenticatedGuard],
  exports: [PostsService],
})
export class PostsModule {}
