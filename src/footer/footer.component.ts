import { Component } from '@angular/core';
import { IFavorsBlock } from '../interfaces/IFavors';
import { IBoardBlock } from '../interfaces/IBoard';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {

  favorBlock: IFavorsBlock[] =[
    {
      id: 1,
      text: 'Прогулки в горы летом'
    },
    {
      id: 2,
      text: 'Зимние походы в горы'
    },
    {
      id: 3,
      text: 'Посещение храмов в горах'
    },
    {
      id: 4,
      text: 'Экстремальные виды туризма'
    },
    {
      id: 5,
      text: 'Походы в джунглях Амазонии'
    },
    {
      id: 6,
      text: 'Поездка в Африку'
    },
  ];

  boardItems: IBoardBlock[] = [
    {
      id: 1,
      text: 'Как собрать в долгий поход?'
    },
    {
      id: 2,
      text: 'Жизненно важные предметы для похода'
    },
    {
      id: 3,
      text: 'Медицинская страховка, гарантии безопасности'
    },
    {
      id: 4,
      text: 'Если вы врач - загляните сюда'
    },
  ];

}
