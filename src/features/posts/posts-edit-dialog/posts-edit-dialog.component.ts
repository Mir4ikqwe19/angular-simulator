import { Component, inject } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IPost } from '../IPost';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';

@Component({
  selector: 'app-posts-edit-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './posts-edit-dialog.component.html',
  styleUrl: './posts-edit-dialog.component.scss',
})
export class PostsEditDialogComponent {

  private ref: DynamicDialogRef = inject(DynamicDialogRef);
  private config: DynamicDialogConfig = inject(DynamicDialogConfig);
  private fb: FormBuilder = inject(FormBuilder);

  post: IPost = this.config.data;

  editPostForm: FormGroup = this.fb.group({
    title: [this.post.title],
    tags: [this.post.tags],
    views: [this.post.views]
  });

  onSubmit(): void {
    const updatedPost: IPost = this.editPostForm.getRawValue();
    this.ref.close(updatedPost);
  }

}
