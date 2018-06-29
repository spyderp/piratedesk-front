import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FaqService } from '../../admin/shared/services/faq.service';
import { CategoryfaqService } from '../../admin/shared/services/categoryfaq.service';
import { CategoryFaq } from '../../admin/shared/models';
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.sass']
})
export class FaqComponent implements OnInit {
	private search:string
	private showCategory:boolean= false;
	private category: string = null;
  private categoryList:CategoryFaq[] = []
  private faqList:any[] = [];
  temp:any[] = [];
  constructor(
    private route: ActivatedRoute,
    private faqService:FaqService,
    private categoryfaqService: CategoryfaqService
   ) { }

  ngOnInit() {
  	 
     this.loadAll();
     this.route.params.subscribe(params => {
       this.category = params['category']; 
       if(this.category =='all') {
         this.showCategory = true
       }else if(this.category) {
         this.filterCategory(this.category)
       }
     });
     
     
  }
  onSearch(search){
    const val = search.toLowerCase();
    // filter our data
    
    const temp = this.temp.filter(function(d) {
      return d.title.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.faqList = temp;
	}
  loadAll(){
    //this.faqService.getAll().subscribe(data=>{this.faqList = data; this.temp = [...data];})
    //this.categoryfaqService.getAll().subscribe(data=>{this.categoryList = data})
  }
  private filterCategory(search:string=null){
    let result:any = this.categoryList.filter(data => data.name == search);
    console.log(this.categoryList)
    //const val = result.id;
    /*const temp = this.temp.filter(function(d) {
      return d.category_id.indexOf(val) !== -1 || !val;
    });*/
    // update the rows
    //this.faqList = temp;
  }

}
