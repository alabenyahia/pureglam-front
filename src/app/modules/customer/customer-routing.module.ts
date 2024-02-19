import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomerDashboardComponent} from "./components/customer-dashboard/customer-dashboard.component";
import {CustomerStoresComponent} from "./components/customer-stores/customer-stores.component";
import {CustomerAddStoreComponent} from "./components/customer-add-store/customer-add-store.component";
import {CustomerUpdateStoreComponent} from "./components/customer-update-store/customer-update-store.component";
import {CustomerStoreDetailsComponent} from "./components/customer-store-details/customer-store-details.component";

const routes: Routes = [
  {path: "dashboard", component: CustomerDashboardComponent},
  {path: "stores", component: CustomerStoresComponent},
  {path: "store/add", component: CustomerAddStoreComponent},
  {path: "store/update/:id", component: CustomerUpdateStoreComponent},
  {path: "store/details/:id", component: CustomerStoreDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
