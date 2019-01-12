import { Component, OnInit, Input } from '@angular/core';
import { CommentsService } from  '../shared/services/comments.service'
import {Event, Message} from '../shared/models'
@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.sass']
})
export class CommentsComponent implements OnInit {
	@Input() ticketId:number
	@Input() assigment:boolean = false
  messages: Message[] = [];
  messageContent: string;
  ioConnection: any;
  constructor(
  	private commentsService:CommentsService
  ) { }

  ngOnInit() {
    this.commentsService.onEvent(Event.CONNECT)
      .subscribe(() => {
        console.log('connected');
     });
      console.log(this.ticketId, this.assigment);
      this.commentsService.onConnect({
        ticketId:this.ticketId,
        username:'prueba'
      });
    this.ioConnection = this.commentsService.onMessage()
        .subscribe((message: Message) => {
          this.messages.push(message);
    });
  }
  public onSend(){
    this.commentsService.send({
      username: 'prueba',
      message: this.messageContent
    });
    this.messageContent = ''
  }
}
