import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.sass']
})
export class InboxComponent implements OnInit {
	private tabsMenu = [
		{
			path:'bandeja',
			title: 'Bandeja'
		}
	];
	private tabsItems:number  = 0;
  constructor() { }

  ngOnInit() {
  }
  setTabsAdd(){
  	this.tabsItems++;
  	this.tabsMenu = this.tabsMenu.concat(
  		{
  			path:'add-ticket/'+this.tabsItems,
				title: 'Agregar('+this.tabsItems+')'		
  		}
  	); 

  }
  setTabEdit(id){
  	this.tabsItems++;
  	this.tabsMenu = this.tabsMenu.concat(
  		{
  			path:'edit-ticket/'+id,
				title: 'Agregar('+this.tabsItems+')'		
  		}
  	); 
  }
}
