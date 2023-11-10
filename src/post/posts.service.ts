import { Post } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePostDto } from './posts.post.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async createPost(postDto: CreatePostDto): Promise<Post> {
    const newPost = await this.prisma.post.create({
      data: {
        author: {
          connect: {
            id: postDto.authorId,
          },
        },
        title: postDto.title,
        caption: postDto.caption,
        content: postDto.content,
      },
    });
    return newPost;
  }
}
