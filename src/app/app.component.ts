import { Component } from '@angular/core';
import './training' 
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../header/header.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { MessageComponent } from "../message/message.component";


@Component({
  selector: 'app-root',
  imports: [FormsModule, HeaderComponent, RouterOutlet, FooterComponent, MessageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  
  isLoading: boolean = true;

  constructor() {
    this.initPage();
  }

  private initPage(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
  
}