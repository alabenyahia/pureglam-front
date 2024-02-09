import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSlideToggle, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pureglam-front';
}
