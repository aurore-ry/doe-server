import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { PostsService } from './posts.service';
import { IsAuthenticatedGuard } from '../common/guards/IsAuthenticatedGuard';
import { CreatePostDto } from './posts.post.dto';

@Controller('posts')
@UseGuards(new IsAuthenticatedGuard())
export class PostController {
  constructor(private postService: PostsService) {}

  @Post('/create')
  async addNewPost(
    @Req() reply: FastifyReply,
    @Body() createPostDto: CreatePostDto,
  ) {
    const addPost = await this.postService.createPost(createPostDto);
    console.log(addPost);
    reply.redirect(302, 'http://localhost:3001/dashboard');
  }
}
