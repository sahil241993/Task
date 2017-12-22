import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './component/navbar/navbar.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { ProfileComponent } from './component/profile/profile.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { RegisterComponent } from './component/register/register.component';
import {AuthguardService} from './services/authguard.service'
const routes: Routes = [
  {
    path: '',
    component:HomeComponent
  },
  {
    path: 'register',
    component:RegisterComponent
  },
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: 'profile',
    component:ProfileComponent,
    canActivate:[AuthguardService]
  },
  {
    path: 'dashboard',
    component:DashboardComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
