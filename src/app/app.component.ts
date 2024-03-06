import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TitleCasePipe} from "@angular/common";
import {LoginComponent} from "./components/login/login.component";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TitleCasePipe, LoginComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Web4 Dashkevich Egor P3208 var531';
}
