import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ChatComponent } from './politicians/chat/chat.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: './authentication/authentication.module#AuthenticationModule'
  },
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
  },
  {
    path: 'politicians',
    loadChildren: './politicians/politicians.module#PoliticiansModule',
    canActivateChild: [AuthGuard]
  },
  {
    path: 'chat',
    loadChildren: './chat/chat.module#ChatModule',
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
