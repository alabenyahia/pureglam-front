import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatToolbar} from "@angular/material/toolbar";
import {Router, RouterLink} from "@angular/router";
import {StorageService} from "../../../auth/services/storage/storage.service";
import {UserAuthStatusService} from "../../../auth/services/user-auth-status/user-auth-status.service";

@Component({
  selector: 'app-customer-navbar',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatToolbar,
    RouterLink,
    MatMenuTrigger
  ],
  templateUrl: './customer-navbar.component.html',
  styleUrl: './customer-navbar.component.css'
})
export class CustomerNavbarComponent {

  constructor(private router: Router,
              private userAuthStatusService: UserAuthStatusService) {}

  logoutCustomer() {
    this.userAuthStatusService.updateCustomerUserLoginStatus(false);
    StorageService.logoutCustomer();
    this.router.navigateByUrl("/customer/login");
  }

}
