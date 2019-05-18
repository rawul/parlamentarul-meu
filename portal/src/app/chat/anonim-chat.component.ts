import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { interval } from 'rxjs'

@Component({
  selector: 'app-anonim-chat',
  templateUrl: './anonim-chat.component.html',
  styleUrls: ['./anonim-chat.component.scss']
})
export class AnonimChatComponent implements OnInit {
  currentMessage: string;
  sidebarChat: any;
  token: string;
  interval: any;
  email: string;
  constructor(
    private service: DashboardService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((element) => {
      console.log(element.token)
      if (element.token) {
        this.token = element.token;
        this.interval = interval(1000).subscribe(x => {
          this.service.getChatByToken(this.token).subscribe(element => {
            this.sidebarChat = element;
            this.email = this.sidebarChat.messages[0].from;
            this.sidebarChat.messages.forEach(element => {
              // console.log(element.from);
            });
          });
        })
        console.log(this.interval);
      }
      else
        this.router.navigateByUrl('/dashboard');
    })
  }
  ngOnDestroy() {
    this.interval.unsubscribe();
  }
  sendMessage() {
    if (this.currentMessage) {
      // this.service.postMessage(this.currentMessage, this.chats[this.activeChat].userToken).subscribe(element => {
      //   console.log(element);
      //   this.service.getChats(this.politician.email).subscribe((chats: any) => {
      //     this.chats = chats;
      //   })
      // })
      this.service.postMessage(this.currentMessage, this.token, this.email).subscribe(element => {
        this.service.getChatByToken(this.token).subscribe(element => {
          this.sidebarChat = element;
        })
      });
      this.currentMessage = ''
    }
  }
}
