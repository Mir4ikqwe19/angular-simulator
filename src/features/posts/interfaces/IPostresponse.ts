import { IPost } from './IPost';

export interface IPostResponse {
  limit: number;
  posts: IPost[];
  skip: number;
  total: number;
}
