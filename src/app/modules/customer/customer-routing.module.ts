import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomerDashboardComponent} from "./components/customer-dashboard/customer-dashboard.component";
import {CustomerStoresComponent} from "./components/customer-stores/customer-stores.component";

const routes: Routes = [
  {path: "dashboard", component: CustomerDashboardComponent},
  {path: "stores", component: CustomerStoresComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
