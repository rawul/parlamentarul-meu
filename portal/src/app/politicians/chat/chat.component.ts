import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import { ActivatedRoute } from '@angular/router';
import { interval } from 'rxjs'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  interval: any;
  politician: any;
  currentMessage: string;
  chats: any;
  activeChat: number = 0;
  @ViewChild('chat') private chat: ElementRef;
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
  constructor(
    private service: DashboardService,
    private route: ActivatedRoute
  ) { }
  scrollToBottom() {
    this.chat.nativeElement.scrollTop = this.chat.nativeElement.scrollHeight;

  }
  ngAfterViewInit(){
    this.scrollToBottom();
  }
  ngOnInit() {
    this.politician = JSON.parse(localStorage.getItem('politician'));

    this.interval = interval(1000).subscribe(x => {
      this.service.getChats(this.politician.email).subscribe((chats: any) => {
        this.chats = chats;
      })
    })
    this.route.params.subscribe((element) => {
      console.log(element.token)
    })
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
    console.log(this.currentMessage)
    if (this.currentMessage) {
      this.service.postMessage(this.currentMessage, this.chats[this.activeChat].userToken, this.politician.email).subscribe(element => {
        console.log(element);
        this.service.getChats(this.politician.email).subscribe((chats: any) => {
          this.chats = chats;
        })
      })
      this.messages.push({
        text: this.currentMessage,
        myMessage: true,
        showDate: false
      })
      this.currentMessage = ''
    }
  }
  ngOnDestroy() {
    this.interval.unsubscribe();
  }
}
