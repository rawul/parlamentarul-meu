import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  currentMessage: string;
  chats: any[] = [
    {},
    {},
    {},
    {},
    {},
    {}
  ]
  activeChat: number = 0;
  messages = [
    {
      text: 'Te-a trimis Basescu',
      myMessage: true,
      showDate: false
    },
    {
      text: 'Nu faci tu ordine la mine in parlament, escroaca',
      myMessage: true,
      showDate: false
    },
    {
      text: 'Domnule Vadim',
      myMessage: false,
      showDate: false
    },
    {
      text: 'Nu iasa presa! Nu iasa presa!',
      myMessage: true,
      showDate: false
    },
    {
      text: 'Va rog frumos',
      myMessage: false,
      showDate: false
    },
  ]
  constructor() { }

  ngOnInit() {
  }
  selectChat(index: number) {
    this.activeChat = index;
  }
  showDate(index: number) {
    this.messages.map((item, i) => {
      if (i != index)
        item.showDate = false;
    })
    this.messages[index].showDate = !this.messages[index].showDate;
  }
  sendMessage() {
    if (this.currentMessage != '') {
      this.messages.push({
        text: this.currentMessage,
        myMessage: true,
        showDate: false
      })
      this.currentMessage = ''
    }
  }
}
