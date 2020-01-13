import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatagridComponent } from './datagrid.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { By } from '@angular/platform-browser';

describe('DatagridComponent', () => {
	let component: DatagridComponent;
	let fixture: ComponentFixture<DatagridComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ DatagridComponent ],
			schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DatagridComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	});

	it('should create', () => {
		expect(component).toBeTruthy()
		expect(component.isEdit).toEqual(false)
		expect(component.isDel).toEqual(false)
	})
	it('should onSelect 1', () => {
		const data: any = [1]
		component.selected = data
		component.onSelect(data)
		expect(component.isEdit).toEqual(true)
		expect(component.isDel).toEqual(true)
	})

	it('should onSelect 2', () => {
		const data: any = [1,2]
		component.selected = data
		component.onSelect(data)
		expect(component.isEdit).toEqual(false)
		expect(component.isDel).toEqual(true)
	})

	it('should onSelect 3', () => {
		const data: any = []
		component.selected = data
		component.onSelect(data)
		expect(component.isEdit).toEqual(false)
		expect(component.isDel).toEqual(false)
	})

	it('should onAdd dom', () => {
		const button = fixture.debugElement.query(By.css('button.btn-success'))
		const addEvent = spyOn(component, 'onAdd')
		button.nativeElement.click()
		expect(addEvent).toHaveBeenCalled()
	})

	it('should onAdd', () => {
		const addEmit = spyOn(component.add, 'emit')
		component.onAdd()
		expect(addEmit).toHaveBeenCalled()
	})

	it('should onEdit', () => {
		const editEmit = spyOn(component.edit, 'emit')
		component.data = [
			{ id: 2, descripcion: 'prueba'},
			{ id: 1, descripcion:  'respuesta' },
		]
		component.onEdit(1)
		expect(editEmit).toHaveBeenCalled()
	})

	it('should onDelete', () => {
		const delEmit = spyOn(component.del, 'emit')
		spyOn(window, 'confirm').and.returnValue(true)
		component.selected = [1]
		component.onDel()
		expect(component.isDel).toEqual(false)
		expect(delEmit).toHaveBeenCalled()
	})
})
