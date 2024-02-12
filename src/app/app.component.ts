import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatButton} from "@angular/material/button";
import {NotAuthNavbarComponent} from "./shared/components/not-auth-navbar/not-auth-navbar.component";
import {CustomerNavbarComponent} from "./shared/components/customer-navbar/customer-navbar.component";
import {UserAuthStatusService} from "./auth/services/user-auth-status/user-auth-status.service";
import {map} from "rxjs";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSlideToggle, MatButton, RouterLink, RouterLinkActive, NotAuthNavbarComponent, CustomerNavbarComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pureglam-front';

  constructor(private userAuthStatusService: UserAuthStatusService) {
  }
  isCustomerLoggedIn = this.userAuthStatusService.currentCustomerUser$.pipe(
    map(user => user.isLoggedIn)
  );



}
