import { Component, inject, OnInit } from '@angular/core';
import { PostApiService } from '../services/post-api.service';
import { PostService } from '../services/post.service';
import { delay, map, Observable, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { TableModule, TablePageEvent } from 'primeng/table';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { MessageService } from '../../../services/message.service';
import { SkeletonModule } from 'primeng/skeleton';
import { RouterOutlet } from '@angular/router';
import { PostsDetailsComponent } from '../posts-details/posts-details.component';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostsEditDialogComponent } from '../posts-edit-dialog/posts-edit-dialog.component';
import { faPenToSquare, IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faSistrix } from '@fortawesome/free-brands-svg-icons';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { IPost } from '../interfaces/IPost';
import { IPostResponse } from '../interfaces/IPostresponse';
import { IEditPostRequest } from '../interfaces/IEditPostRequest';

@Component({
  selector: 'app-posts',
  imports: [
    AsyncPipe,
    TableModule,
    ContextMenuModule,
    SkeletonModule,
    ButtonModule,
    FaIconComponent,
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
  providers: [DialogService],
})
export class PostsComponent implements OnInit {

  private postService: PostService = inject(PostService);
  private ref: DynamicDialogRef<PostsEditDialogComponent> | null = null;
  private dialogService: DialogService = inject(DialogService);

  postList$: Observable<IPost[]> = this.postService.posts$;

  readonly faPenIcon: IconDefinition = faPenToSquare;
  readonly faDeleteMark: IconDefinition = faXmark;
  readonly faMagnify: IconDefinition = faMagnifyingGlass;

  selectedPost: IPost | null = null;
  items!: MenuItem[];
  isLoading: boolean = true;
  first: number = 0;
  rows: number = 10;
  totalRecords: number = 0;

  ngOnInit(): void {
    this.postService
      .loadPosts(this.first, this.rows)
      .pipe(
        tap((response: IPostResponse) => {
          this.postService.setPosts(response.posts);
          this.totalRecords = response.total;
          this.isLoading = false;
        }),
      )
      .subscribe();

    this.initContextMenuItems();
  }

  initContextMenuItems(): void {
    this.items = [
      {
        label: 'View',
        state: {
          icon: this.faMagnify,
        },
        command: () => {
          if (this.selectedPost) {
            this.postService.postPageRedirect(this.selectedPost);
          }
        },
      },
      {
        label: 'Delete',
        state: {
          icon: this.faDeleteMark,
        },
        command: () => {
          if (this.selectedPost) {
            this.postService.deletePost(this.selectedPost.id);
          }
        },
      },
      {
        label: 'Edit',
        state: {
          icon: this.faPenIcon,
        },
        command: () => {
          if (this.selectedPost) {
            this.onEditPost(this.selectedPost);
          }
        },
      },
    ];
  }

  onPostPageRedirect(post: IPost): void {
    this.postService.postPageRedirect(post);
  }

  onPageChange(event: TablePageEvent): void {
    this.first = event.first;
    this.rows = event.rows;

    this.postService
      .loadPosts(event.first, event.rows)
      .pipe(
        tap((response: IPostResponse) => {
          this.postService.setPosts(response.posts);
          this.totalRecords = response.total;
        }),
      )
      .subscribe();
  }

  onEditPost(post: IPost): void {
    this.ref = this.dialogService.open(PostsEditDialogComponent, {
      header: `Edited post: ${ post.title }`,
      data: post,
      dismissableMask: true,
      closeOnEscape: true,
      closable: true,
      width: '30vw',
    });

    this.ref?.onClose
      .pipe(
        tap((updatedPost: IEditPostRequest) => {
          if (updatedPost) {
            this.postService.editPost(updatedPost);
          }
        }),
      )
      .subscribe();
  }

}
