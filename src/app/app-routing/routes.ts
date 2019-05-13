import {Routes} from '@angular/router';

import {MapComponent} from '../map/map.component';
import {HomeComponent} from '../home/home.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {RegisterComponent} from '../register/register.component';
import {LoginComponent} from '../login/login.component';
import {AdminComponent} from '../admin/admin.component';

import {AuthGuard} from '../services/auth.guard';
import {DrawComponent} from '../draw/draw.component';


export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'map', component: MapComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  {path: 'draw', component: DrawComponent},
];

