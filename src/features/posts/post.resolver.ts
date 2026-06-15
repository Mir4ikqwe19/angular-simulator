import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { IPost } from './IPost';
import { inject } from '@angular/core';
import { PostService } from './post.service';

export const postResolver: ResolveFn<IPost> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const postService: PostService = inject(PostService);
  const routeId: string | null = route.paramMap.get('id');
  const postId: number = Number(routeId);

  return postService.getPostById(postId);
}
