import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IPost, IPostForm, IPostResponse } from './IPost';

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

  updatePost(postId: number, changes: IPostForm) {
    return this.http.patch<IPost>(`https://dummyjson.com/posts/${ postId }`, changes);
  }

  createPost(post: IPost) {
    return this.http.post<IPost>('https://dummyjson.com/posts/add', post);
  }

}
