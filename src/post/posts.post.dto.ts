import { MaxLength } from 'class-validator';

export class CreatePostDto {
  authorId: string;
  @MaxLength(60)
  title: string;
  @MaxLength(40)
  caption: string;
  content: string;
}
