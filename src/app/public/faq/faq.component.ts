import { Component, OnInit, OnDestroy  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FaqService } from '../../admin/shared/services/faq.service';
import { CategoryfaqService } from '../../admin/shared/services/categoryfaq.service';
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.sass']
})
export class FaqComponent implements OnInit {
	private search:string
	private showCategory:boolean= false;
  private sub: any;
	private category: string = null;
   categoryList:any[] = []
  private faqList:any[] = [];

  constructor(
    private route: ActivatedRoute,
    private faqService:FaqService,
    private categoryfaqService: CategoryfaqService
   ) { }

  ngOnInit() {
  	 this.sub = this.route.params.subscribe(params => {
       this.category = params['category']; 
     });
     //this.faqService.getAll().subscribe(data=>{this.faqList = data})
     this.faqList = [{title:'Hola mundo', content:'Chao', categoryfaq_id:2},{title:'Hola mundo2', content:'Chao2', categoryfaq_id:5},]
     if(this.category && this.category=='all') {
     	this.showCategory = true
     }else if(this.category) {
     }
      //this.categoryfaqService.getAll().subscribe(data=>{this.categoryList = data})
      this.categoryList = [
        {id:1, name:'Clientes', descripcion:"My money's in that office, right? If she start giving me some bullshit about it ain't there, and we got to go someplace else and get" },
        {id:2, name:'Departamentos', descripcion:"My money's in that office, right? If she start giving me some bullshit about it ain't there, and we got to go someplace else and get" },
        {id:3, name:'Calendario', descripcion:"My money's in that office, right? If she start giving me some bullshit about it ain't there, and we got to go someplace else and get" },
        {id:4, name:'Días Festivos', descripcion:"My money's in that office, right? If she start giving me some bullshit about it ain't there, and we got to go someplace else and get" },
        {id:5, name:'Estados', descripcion:"My money's in that office, right? If she start giving me some bullshit about it ain't there, and we got to go someplace else and get" },
      ];
      console.log( this.categoryList)
  }
  onSubmit(){

	}

	ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private filterFaq(search:string=null,  category:string=null){

  }
}
