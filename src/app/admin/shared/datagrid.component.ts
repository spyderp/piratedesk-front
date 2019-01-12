import { Component, OnInit, Input, Output, EventEmitter, ViewChild  } from '@angular/core';

@Component({
  selector: 'datagrid',
  templateUrl: './datagrid.component.html',
  styleUrls: ['./datagrid.component.sass']
})
export class DatagridComponent implements OnInit {
  @ViewChild('dataGrid') dataGrid;
	@Input() headerH:number =40;
  @Input() footerH:number =50;
  @Input() rowH:number =40;
  @Input() data:Array<any> = [];
  @Input() column = [];
  @Input() selected = [];
  @Input() privilege = [];
  @Input() loading:boolean = false;
  @Output() add = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() del = new EventEmitter();
  isEdit:boolean = false;
  isDel:boolean = false;
  constructor() { }

  ngOnInit() {

  }
  onSelect({ selected }) {
    if(selected.length>0 && selected.length<2){
      this.isEdit = true;
      this.isDel  = true;
    }else if(selected.length>1){
      this.isEdit = false;
      this.isDel  = true;
    }else if(selected.length==0){
      this.isEdit = false;
      this.isDel  = false;
    }
  }
  onAdd(){
    this.add.emit(true);
  }
  onEdit(id){
    let select = this.data.filter(e=>{return e.id==id})
    this.edit.emit(select);
    this.selected = [];
  }
  onDel(){
    let msg = this.selected.length>1?'Esta seguro que desea Borrar los registros seleccionados':'Esta seguro que desea Borrar el registro seleccionado';
    if(confirm(msg)){
      this.del.emit(this.selected);
      this.isDel  = false;
    }
  }
  
}
