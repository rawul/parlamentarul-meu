import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnonimChatComponent } from './anonim-chat.component';

const routes: Routes = [
  {
    path: ':token',
    component: AnonimChatComponent
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
