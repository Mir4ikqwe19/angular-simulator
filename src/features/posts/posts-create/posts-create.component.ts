import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { PostService } from '../services/post.service';
import { RouterLink } from '@angular/router';
import { IPost } from '../interfaces/IPost';

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
    title: ['', [Validators.required, Validators.minLength(3)]],
    body: ['', [Validators.required, Validators.minLength(2)]],
    tags: ['', [Validators.required, Validators.maxLength(30)]],
    reactions: this.fb.group({
      likes: ['', Validators.required],
      dislikes: ['', Validators.required],
    }),
    views: ['', Validators.required],
    userId: ['', [Validators.required, Validators.minLength(1)]],
  });

  onSubmit(): void {
    if (this.createPostForm.valid) {
      const createFormValue: IPost = { ...this.createPostForm.getRawValue(), id: Date.now() };

      this.postService.createPost(createFormValue);
      this.createPostForm.reset();
    }
  }

}
