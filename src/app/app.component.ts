import { Component, inject } from '@angular/core';
import './training' 
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../header/header.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { MessageComponent } from "../message/message.component";
import { LoaderService } from '../services/loader.service';
import { LoaderComponent } from '../loader/loader.component';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-root',
  imports: [FormsModule, HeaderComponent, RouterOutlet, FooterComponent, MessageComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  
}