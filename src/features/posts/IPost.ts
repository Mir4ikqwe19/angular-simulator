export interface IPost {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
}

export interface IPostResponse {
  limit: number;
  posts: IPost[];
  skip: number;
  total: number;
}

export interface IPostForm {
  title: string;
  tags: string[];
  views: number;
}
