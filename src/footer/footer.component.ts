import { Component, inject } from '@angular/core';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faPinterest, faSkype, faTelegram, faVk } from '@fortawesome/free-brands-svg-icons'
import { PostService } from '../features/posts/post.service';

@Component({
  selector: 'app-footer',
  imports: [FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {

  favorBlock: string[] = ['Прогулки в горы летом', 'Зимние походы в горы', 'Посещение храмов в горах', 'Экстремальные виды туризма', 'Походы в джунглях Амазонии', 'Поездка в Африку'];
  boardItems: string[] = ['Как собрать в долгий поход?', 'Жизненно важные предметы для похода', 'Медицинская страховка, гарантии безопасности', 'Если вы врач - загляните сюда'];
  faTelegram: IconDefinition = faTelegram;
  faVk: IconDefinition = faVk;
  faPinterest: IconDefinition = faPinterest;
  faSkype: IconDefinition = faSkype;

}
