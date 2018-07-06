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
  private first:boolean = false;
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
       }else if(this.category && this.first) {
         this.showCategory = false
         this.filterCategory(this.category)
       }
     });
     
     
  }
  onSearch(){
    const val = this.search.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.title.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.faqList = temp;
	}
  loadAll(){
    this.faqService.getAll().subscribe(data=>{this.faqList = data; this.temp = [...data];})
    this.categoryfaqService.getAll().subscribe(data=>{this.categoryList = data
      if(this.category !='all' && this.category && !this.first) { 
        this.filterCategory(this.category)
        this.first = true;
       }
    })
  }
  private filterCategory(search:string=null){
    let result:any = this.categoryList.filter(data => data.name == search);
    const val = result[0].id;
    console.log(this.temp)
    const temp = this.temp.filter(d =>d.category_id == val);
    // update the rows
    this.faqList = temp;
  }

}
