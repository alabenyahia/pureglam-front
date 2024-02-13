import { Routes } from '@angular/router';
import {CustomerRegisterComponent} from "./auth/components/customer-register/customer-register.component";
import {AdminLoginComponent} from "./auth/components/admin-login/admin-login.component";
import {StaffLoginComponent} from "./auth/components/staff-login/staff-login.component";
import {CustomerLoginComponent} from "./auth/components/customer-login/customer-login.component";
import {authCustomerGuard} from "./modules/customer/guards/auth-customer.guard";
import {customerGuard} from "./modules/customer/guards/customer.guard";

export const routes: Routes = [
  {path: "", redirectTo: "customer/dashboard", pathMatch: "full"},
  {path: "register", component: CustomerRegisterComponent, canActivate: [authCustomerGuard]},
  {path: "admin/login", component: AdminLoginComponent},
  {path: "staff/login", component: StaffLoginComponent},
  {path: "customer/login", component: CustomerLoginComponent, canActivate: [authCustomerGuard]},
  {path: "customer", loadChildren: () => import("./modules/customer/customer.module").then(m => m.CustomerModule), canActivate: [customerGuard]}
];
