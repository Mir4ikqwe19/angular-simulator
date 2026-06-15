import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostApiService } from '../post-api.service';
import { PostService } from '../post.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { IPost } from '../IPost';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-posts-details',
  imports: [RouterLink],
  templateUrl: './posts-details.component.html',
  styleUrl: './posts-details.component.scss',
})
export class PostsDetailsComponent implements OnInit{

  private route: ActivatedRoute = inject(ActivatedRoute);
  
  post!: IPost;

  ngOnInit(): void {
    this.post = this.route.snapshot.data['post'];
  }

}
