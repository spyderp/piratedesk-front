import { Component, OnInit, Input, Output, EventEmitter, ViewChild  } from '@angular/core'

@Component({
	selector: 'datagrid',
	templateUrl: './datagrid.component.html',
	styleUrls: ['./datagrid.component.sass']
})
export class DatagridComponent implements OnInit {
	@ViewChild('dataGrid', { static: false }) dataGrid
	@Input() headerH = 40
	@Input() footerH = 50
	@Input() rowH = 40
	@Input() data:Array<any> = []
	@Input() column = []
	@Input() selected = []
	@Input() privilege = []
	@Input() loading = false
	@Output() add = new EventEmitter()
	@Output() edit = new EventEmitter()
	@Output() del = new EventEmitter()
	isEdit = false
	isDel = false
	constructor() { }

	ngOnInit() {

	}
	onSelect({selected}) {
		if (this.selected.length > 0 && this.selected.length < 2) {
			this.isEdit = true
			this.isDel  = true
		} else if (this.selected.length > 1) {
			this.isEdit = false
			this.isDel  = true
		} else if (this.selected.length === 0) {
			this.isEdit = false
			this.isDel  = false
		}
	}
	onAdd(): void {
		this.add.emit(true)
	}
	onEdit(id) {
		const select = this.data.filter(e => e.id === id )
		this.edit.emit(select)
		this.selected = []
	}
	onDel() {
		const msg = this.selected.length > 1 ? 'Esta seguro que desea Borrar los registros seleccionados' :
		'Esta seguro que desea Borrar el registro seleccionado'
		if (confirm(msg)) {
			this.del.emit(this.selected)
			this.isDel  = false
		}
	}
}
