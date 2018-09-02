import { Component, OnInit} from '@angular/core';
import { Ticket } from './shared/models'
export interface TabContent {
  id: number;
  title: string;
  ticket:Ticket;
  type:string;
}

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.sass']
})
export class InboxComponent implements OnInit {
	private tabsMenu:TabContent[] = [];
	private tabsItems:number  = 0;
  constructor() { }

  ngOnInit() {
  }
  setTabAdd(tabInbox){
  	this.tabsItems++;
  	this.tabsMenu = this.tabsMenu.concat(
  		{
  			id:this.tabsItems,
				title: 'nuevo ticket',
        ticket:null,
        type:'add'
  		}
  	); 
    console.log(tabInbox.select('ngb-tab-2'))

  }
  setTabEdit(tickets:Ticket[]){
  	this.tabsItems++;
    tickets.map(ticket=>{
      this.tabsMenu = this.tabsMenu.concat(
        {
          id:this.tabsItems,
          title: 'Caso #'+ticket.id,
          ticket:ticket,
          type:'edit'
        }
      ); 
    });
  	
  }

  onCloseTab(tabId:number, $event): void {
    this.tabsMenu.splice(tabId,1);
    $event.preventDefault();
  }
}
