import { Component, inject, OnInit } from '@angular/core';
import { PostApiService } from '../post-api.service';
import { PostService } from '../post.service';
import { delay, map, Observable, tap } from 'rxjs';
import { IPost, IPostForm, IPostResponse } from '../IPost';
import { AsyncPipe } from '@angular/common';
import { TableModule, TablePageEvent } from 'primeng/table';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { MessageService } from '../../../services/message.service';
import { SkeletonModule } from 'primeng/skeleton';
import { RouterOutlet } from '@angular/router';
import { PostsDetailsComponent } from '../posts-details/posts-details.component';
import { ButtonModule } from "primeng/button";
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostsEditDialogComponent } from '../posts-edit-dialog/posts-edit-dialog.component';
import { faPenToSquare, IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-posts',
  imports: [AsyncPipe, TableModule, ContextMenuModule, SkeletonModule, ButtonModule, FaIconComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
  providers: [DialogService]
})
export class PostsComponent implements OnInit {

  private postService: PostService = inject(PostService);
  private ref: DynamicDialogRef<PostsEditDialogComponent> | null = null;
  private dialogService: DialogService = inject(DialogService);

  postList$: Observable<IPost[]> = this.postService.posts$;
  
  faPenIcon: IconDefinition = faPenToSquare;
  selectedPost: IPost | null = null;
  items!: MenuItem[];
  isLoading: boolean = true;
  first: number = 0;
  rows: number = 10;
  totalRecords: number = 0;

  ngOnInit(): void {
    this.postService.loadPosts(this.first, this.rows).pipe(
      tap((response: IPostResponse) => {
        this.postService.setPosts(response.posts);
        this.totalRecords = response.total;
        this.isLoading = false;
      })
    ).subscribe();

    this.items = [
      { label: 'View', icon: 'pi pi-fw pi-search', command: () => {
          if (this.selectedPost) {
            this.postService.redirect(this.selectedPost)
          }
        } 
      },
      { label: 'Delete', icon: 'pi pi-fw pi-times', command: () => {
          if (this.selectedPost) {
            this.postService.deletePost(this.selectedPost);
          }
        } 
      },
      {
        label: 'Edit', icon: ' pi pi-fw pi-pencil', command: () => {
          if (this.selectedPost) {
            this.onEditPost(this.selectedPost);
          }
        }
      }
    ];
  }

  onRedirect(post: IPost): void {
    this.postService.redirect(post);
  }

  onPageChange(event: TablePageEvent): void {
    this.first = event.first;
    this.rows = event.rows;

    this.postService.loadPosts(event.first, event.rows).pipe(
      tap((response: IPostResponse) => {
        this.postService.setPosts(response.posts);
        this.totalRecords = response.total;
      })
    ).subscribe();
  }

  onEditPost(post: IPost): void {
    this.ref = this.dialogService.open(PostsEditDialogComponent, 
      { 
        header: `Edited post: ${ post.title }`,
        data: post,
        dismissableMask: true,
        closeOnEscape: true,
        closable: true,
        width: '30vw'
      }
    );

    this.ref?.onClose.pipe(
      tap((updatedPost: IPostForm) => {
        if (updatedPost) {
          this.postService.editPost(post.id, updatedPost);
        }
      })
    ).subscribe();
  }

}
