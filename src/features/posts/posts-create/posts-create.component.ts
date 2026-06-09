import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { IPost } from '../IPost';
import { PostService } from '../post.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-posts-create',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './posts-create.component.html',
  styleUrl: './posts-create.component.scss',
})
export class PostsCreateComponent {

  private fb: FormBuilder = inject(FormBuilder);
  private postService: PostService = inject(PostService);

  createPostForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    body: ['', Validators.required],
    tags: ['', Validators.required],
    reactions: this.fb.group({
      likes: ['', Validators.required],
      dislikes: ['', Validators.required]
    }),
    views: ['', Validators.required],
    userId: ['', Validators.required]
  });

  onSubmit(): void {
    if (this.createPostForm.valid) {
      const createFormValue: IPost = { ...this.createPostForm.getRawValue(), id: Date.now() }

      this.postService.createPost(createFormValue);
      this.createPostForm.reset();
    }
  }

}
