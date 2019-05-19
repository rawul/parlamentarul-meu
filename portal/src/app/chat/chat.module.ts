import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ChatRoutingModule } from './chat-routing.module';
import { AnonimChatComponent } from './anonim-chat.component';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [AnonimChatComponent, NavBarComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    FormsModule
  ]
})
export class ChatModule { }
