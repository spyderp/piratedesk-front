import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core'
import { CommentsService } from '../shared/services/comments.service'
import {Event, Message} from '../shared/models'
import { NgxSmartLoaderService } from 'ngx-smart-loader'
import { ToastrService } from 'ngx-toastr'
@Component({
	selector: 'app-comments',
	templateUrl: './comments.component.html',
	styleUrls: ['./comments.component.sass']
})
export class CommentsComponent implements AfterViewInit {
	@Input() ticket_id: number
	@Input() assigment = false
	@Input() status
	@ViewChild('commentBox', {static: false}) commentBox: ElementRef
	messages: any[]
	messageContent: string
	loaderMsg  = true
	lastId: number
	counter = 60
	constructor(
		private commentsService:CommentsService,
		private toastService: ToastrService
	) { }

	ngAfterViewInit() {
		this.commentsService.getMsgForTiccke(this.ticket_id).subscribe( data => {
			if(data) {
				this.messages = data
				this.lastId = this.messages[this.messages.length - 1].id
				setTimeout(() => {
					this.commentBox.nativeElement.scrollTop = this.commentBox.nativeElement.scrollHeight
				}, 500)
			}
			this.loaderMsg = false
		}, error => {
			this.messages = []
			this.loaderMsg = false
		})
		/*setInterval(() => {
			this.loadUpdate()
		}, 60000)
		setInterval(() => {
			this.counter--
			if (this.counter === -1) {
				this.counter = 60
			}
		}, 1000)*/
	}
	public loadUpdate() {
		this.loaderMsg = true
		this.commentsService.getLastUpdate(this.ticket_id, this.lastId).subscribe(data => {
			this.messages.push(data)
			this.commentBox.nativeElement.scrollTop = this.commentBox.nativeElement.scrollHeight
			this.lastId = this.messages[this.messages.length - 1].id
			this.loaderMsg = false
		}, error => {
			this.loaderMsg = false
		})
	}
	public onSend() {
		this.loaderMsg = true
		const data = {
			body: this.messageContent,
			ticket_id: this.ticket_id,
			from_user_id: 1
		}
	 	this.commentsService.create(data).subscribe( data => {
				this.messages.push(data)
				this.commentBox.nativeElement.scrollTop = this.commentBox.nativeElement.scrollHeight
				this.loaderMsg = false
		 }, error => {
				this.toastService.error('Ocurrio un error y no se pudo enviar el mensaje')
				this.loaderMsg = false
		 })
	 	this.messageContent = ''
	}
}
