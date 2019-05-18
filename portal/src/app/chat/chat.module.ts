import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ChatRoutingModule } from './chat-routing.module';
import { AnonimChatComponent } from './anonim-chat.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AnonimChatComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    FormsModule
  ]
})
export class ChatModule { }
