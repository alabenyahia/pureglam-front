import { Component } from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {RouterLink} from "@angular/router";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-not-auth-navbar',
  standalone: true,
  imports: [
    MatToolbar,
    RouterLink,
    MatMenuTrigger,
    MatIcon,
    MatMenu,
    MatMenuItem,
    MatIconButton
  ],
  templateUrl: './not-auth-navbar.component.html',
  styleUrl: './not-auth-navbar.component.css'
})
export class NotAuthNavbarComponent {

}
