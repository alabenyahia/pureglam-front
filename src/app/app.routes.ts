import { Routes } from '@angular/router';
import {CustomerRegisterComponent} from "./auth/components/customer-register/customer-register.component";
import {AdminLoginComponent} from "./auth/components/admin-login/admin-login.component";
import {StaffLoginComponent} from "./auth/components/staff-login/staff-login.component";
import {CustomerLoginComponent} from "./auth/components/customer-login/customer-login.component";

export const routes: Routes = [
  {path: "register", component: CustomerRegisterComponent},
  {path: "admin/login", component: AdminLoginComponent},
  {path: "staff/login", component: StaffLoginComponent},
  {path: "customer/login", component: CustomerLoginComponent}
];
