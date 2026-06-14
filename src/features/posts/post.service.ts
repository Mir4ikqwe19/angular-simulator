import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, map, Observable, of, tap, throwError } from 'rxjs';
import { PostApiService } from './post-api.service';
import { IPost } from './IPost';
import { LoaderService } from '../../services/loader.service';
import { MessageService } from '../../services/message.service';
import { Route, Router } from '@angular/router';
import { TablePageEvent } from 'primeng/table';
import { IPostResponse } from './IPostresponse';
import { IPostEditForm } from './IPostEditForm';
import { IEditPostRequest } from './IEditPostRequest';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  
  private postApiService: PostApiService = inject(PostApiService);
  private loaderService: LoaderService = inject(LoaderService);
  private messageService: MessageService = inject(MessageService);
  private router: Router = inject(Router);

  private postsSubject: BehaviorSubject<IPost[]> = new BehaviorSubject<IPost[]>([]);
  posts$: Observable<IPost[]> = this.postsSubject.asObservable();

  getPosts(): IPost[] {
    return this.postsSubject.getValue();
  }

  getPostById(postId: number): Observable<IPost> {
    this.loaderService.showLoader();

    return this.postApiService.getPostsById(postId).pipe(
      finalize(() => this.loaderService.hideLoader())
    );
  }

  setPosts(post: IPost[]): void {
    this.postsSubject.next(post);
  }

  editPost(post: IEditPostRequest): void {
    this.loaderService.showLoader();

    this.postApiService.updatePost(post).pipe(
      tap(() => {
        const changedPosts: IPost[] = this.getPosts().map((currentPost: IPost) => {
          return currentPost.id === post.id ? { ...currentPost, ...post } : currentPost;
        });

        this.setPosts(changedPosts);
        this.messageService.showSucces(`Пост под номером - ${ post.id } изменён`);
      }),
      catchError((err: unknown) => {
        this.messageService.showError('Не удалось изменить!');
        return throwError(() => err);
      }),
      finalize(() => this.loaderService.hideLoader())
    ).subscribe();
  }

  createPost(newPost: IPost): void {
    this.loaderService.showLoader();

    this.postApiService.createPost(newPost).pipe(
      tap((post: IPost) => {
        const newPost: IPost[] = [...this.postsSubject.getValue(), post];
        this.setPosts(newPost);

        this.messageService.showSucces(`Пост Создан ${ post.title }`);
      }),
      catchError((err: unknown) => {
        this.messageService.showError('Не удалось создать!');
        return throwError(() => err);
      }),
      finalize(() => {
        this.loaderService.hideLoader()
        this.router.navigate([`posts`]);
      })
    ).subscribe();
  }

  deletePost(postId: number): void {
    this.loaderService.showLoader()
    
    this.postApiService.deletePostById(postId).pipe(
      tap(() => {
        const deletedPost: IPost[] = this.getPosts().filter((currPost: IPost) => currPost.id !== postId);
        this.setPosts(deletedPost);
        
        this.messageService.showInfo(`Пост под номером - ${ postId } удалён`);
      }),
      catchError((err: unknown) => {
        this.messageService.showError('Не удалось удалить!');
        return throwError(() => err);
      }),
      finalize(() => this.loaderService.hideLoader())
    ).subscribe();
  }

  postPageredirect(post: IPost): void {
    this.router.navigate([`posts/post/${ post.id }`]);
  }

  loadPosts(skip: number, limit: number): Observable<IPostResponse> {
    this.loaderService.showLoader();

    return this.postApiService.getPosts(limit, skip).pipe(
      catchError((err: unknown) => {
        this.messageService.showError('Не удалось загрузить!');
        return throwError(() => err);
      }),
      finalize(() => this.loaderService.hideLoader())
    );
  }

}
