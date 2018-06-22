import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['../../../assets/css/_public.sass']
})
export class ContactComponent implements OnInit {
	public model:any = [];
  constructor() { }

  ngOnInit() {
  }
  onSubmit(){

	}
}
