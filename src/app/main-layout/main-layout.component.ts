import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { MessageComponent } from '../../message/message.component';
import { LoaderComponent } from '../../loader/loader.component';

@Component({
  selector: 'app-main-layout',
  imports: [HeaderComponent, FooterComponent, RouterOutlet, MessageComponent, LoaderComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {

}
