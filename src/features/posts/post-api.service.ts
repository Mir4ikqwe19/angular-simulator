import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IPost} from './IPost';
import { IPostResponse } from './IPostresponse';
import { IPostEditForm } from './IPostEditForm';
import { IEditPostRequest } from './IEditPostRequest';

@Injectable({
  providedIn: 'root',
})
export class PostApiService {

  private http: HttpClient = inject(HttpClient);

  getPosts(limit: number, skip: number): Observable<IPostResponse> {
    return this.http.get<IPostResponse>(`https://dummyjson.com/posts?limit=${ limit }&skip=${ skip }`);
  }

  getPostsById(postId: number): Observable<IPost> {
    return this.http.get<IPost>(`https://dummyjson.com/posts/${ postId }`);
  }

  deletePostById(postId: number): Observable<IPost> {
    return this.http.delete<IPost>(`https://dummyjson.com/posts/${ postId }`);
  }

  updatePost(post: IEditPostRequest) {
    return this.http.patch<IPost>(`https://dummyjson.com/posts/${ post.id }`, post);
  }

  createPost(post: IPost) {
    return this.http.post<IPost>('https://dummyjson.com/posts/add', post);
  }

}
