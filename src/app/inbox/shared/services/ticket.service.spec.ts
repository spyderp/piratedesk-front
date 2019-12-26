import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TicketService } from './ticket.service';
import { Ticket } from '../models';
import { environment } from '../../../../environments/environment'

describe('TicketService', () => {
	let service: TicketService
	let httpMock: HttpTestingController
	const url = environment.apiServer
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [TicketService],
			imports: [HttpClientTestingModule],
		})
		service = TestBed.get(TicketService)
		httpMock = TestBed.get(HttpTestingController)
	})

	it('should be created', () => {
		expect(service).toBeTruthy()
	})

	it('should return expected Ticket get all', () => {
		const expectReturn: Ticket[] = [
			{
				id: 1,
				titulo: 'fdglkdlfgk',
				content: 'fdglkdlfgk',
				keys: 'fdglkdlfgk',
				email: 'fdglkdlfgk',
				telefono: 'fdglkdlfgk',
				celular: 'fdglkdlfgk',
				creado: 'fdglkdlfgk',
				modificado: 'fdglkdlfgk',
				clients: 'fdglkdlfgk',
				departments: 'fdglkdlfgk',
				priorities: 'fdglkdlfgk',
				states: 'fdglkdlfgk',
				users: 'fdglkdlfgk',
				client_id: 1,
				department_id: 1,
				state_id: 1,
				user_id: 1,
				priority_id: 1,
				assigments: [],
				files: [],
			},
			{
				id: 2,
				titulo: 'fdglkdlfgk',
				content: 'fdglkdlfgk',
				keys: 'fdglkdlfgk',
				email: 'fdglkdlfgk',
				telefono: 'fdglkdlfgk',
				celular: 'fdglkdlfgk',
				creado: 'fdglkdlfgk',
				modificado: 'fdglkdlfgk',
				clients: 'fdglkdlfgk',
				departments: 'fdglkdlfgk',
				priorities: 'fdglkdlfgk',
				states: 'fdglkdlfgk',
				users: 'fdglkdlfgk',
				client_id: 1,
				department_id: 1,
				state_id: 1,
				user_id: 1,
				priority_id: 1,
				assigments: [],
				files: [],
			},
		]
		service.getAll().subscribe(tickets => {
			expect(tickets).toEqual(expectReturn, 'is equal')
		})
		const req = httpMock.expectOne(url + '/tickets', 'call to api')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		httpMock.verify()
	})

	it('should return expected Ticket get all page', () => {
		const expectReturn: Ticket[] = [
			{
				id: 1,
				titulo: 'fdglkdlfgk',
				content: 'fdglkdlfgk',
				keys: 'fdglkdlfgk',
				email: 'fdglkdlfgk',
				telefono: 'fdglkdlfgk',
				celular: 'fdglkdlfgk',
				creado: 'fdglkdlfgk',
				modificado: 'fdglkdlfgk',
				clients: 'fdglkdlfgk',
				departments: 'fdglkdlfgk',
				priorities: 'fdglkdlfgk',
				states: 'fdglkdlfgk',
				users: 'fdglkdlfgk',
				client_id: 1,
				department_id: 1,
				state_id: 1,
				user_id: 1,
				priority_id: 1,
				assigments: [],
				files: [],
			},
			{
				id: 2,
				titulo: 'fdglkdlfgk',
				content: 'fdglkdlfgk',
				keys: 'fdglkdlfgk',
				email: 'fdglkdlfgk',
				telefono: 'fdglkdlfgk',
				celular: 'fdglkdlfgk',
				creado: 'fdglkdlfgk',
				modificado: 'fdglkdlfgk',
				clients: 'fdglkdlfgk',
				departments: 'fdglkdlfgk',
				priorities: 'fdglkdlfgk',
				states: 'fdglkdlfgk',
				users: 'fdglkdlfgk',
				client_id: 1,
				department_id: 1,
				state_id: 1,
				user_id: 1,
				priority_id: 1,
				assigments: [],
				files: [],
			},
		]
		service.getAll(null, 2).subscribe(tickets => {
			expect(tickets).toEqual(expectReturn, 'is equal')
		})
		const req = httpMock.expectOne(url + '/tickets?page=2', 'call to api')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		httpMock.verify()
	})

	it('should return expected Ticket get all with filter', () => {
		const expectReturn: Ticket[] = [
			{
				id: 1,
				titulo: 'fdglkdlfgk',
				content: 'fdglkdlfgk',
				keys: 'fdglkdlfgk',
				email: 'fdglkdlfgk',
				telefono: 'fdglkdlfgk',
				celular: 'fdglkdlfgk',
				creado: 'fdglkdlfgk',
				modificado: 'fdglkdlfgk',
				clients: 'fdglkdlfgk',
				departments: 'fdglkdlfgk',
				priorities: 'fdglkdlfgk',
				states: 'fdglkdlfgk',
				users: 'fdglkdlfgk',
				client_id: 1,
				department_id: 1,
				state_id: 1,
				user_id: 1,
				priority_id: 1,
				assigments: [],
				files: [],
			},
			{
				id: 2,
				titulo: 'fdglkdlfgk',
				content: 'fdglkdlfgk',
				keys: 'fdglkdlfgk',
				email: 'fdglkdlfgk',
				telefono: 'fdglkdlfgk',
				celular: 'fdglkdlfgk',
				creado: 'fdglkdlfgk',
				modificado: 'fdglkdlfgk',
				clients: 'fdglkdlfgk',
				departments: 'fdglkdlfgk',
				priorities: 'fdglkdlfgk',
				states: 'fdglkdlfgk',
				users: 'fdglkdlfgk',
				client_id: 1,
				department_id: 1,
				state_id: 1,
				user_id: 1,
				priority_id: 1,
				assigments: [],
				files: [],
			},
		]
		const filter = {
			titulo: 'kldsjfklsjfksdfj',
			email: 'dfs@fdjklg.com'
		}
		service.getAll(filter).subscribe(tickets => {
			expect(tickets).toEqual(expectReturn, 'is equal')
		})
		const req = httpMock.expectOne(url + '/tickets?find={"titulo":"kldsjfklsjfksdfj","email":"dfs@fdjklg.com"}', 'call to api')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		httpMock.verify()
	})

	it('should return expected Ticket get all with filter and page', () => {
		const expectReturn: Ticket[] = [
			{
				id: 1,
				titulo: 'fdglkdlfgk',
				content: 'fdglkdlfgk',
				keys: 'fdglkdlfgk',
				email: 'fdglkdlfgk',
				telefono: 'fdglkdlfgk',
				celular: 'fdglkdlfgk',
				creado: 'fdglkdlfgk',
				modificado: 'fdglkdlfgk',
				clients: 'fdglkdlfgk',
				departments: 'fdglkdlfgk',
				priorities: 'fdglkdlfgk',
				states: 'fdglkdlfgk',
				users: 'fdglkdlfgk',
				client_id: 1,
				department_id: 1,
				state_id: 1,
				user_id: 1,
				priority_id: 1,
				assigments: [],
				files: [],
			},
			{
				id: 2,
				titulo: 'fdglkdlfgk',
				content: 'fdglkdlfgk',
				keys: 'fdglkdlfgk',
				email: 'fdglkdlfgk',
				telefono: 'fdglkdlfgk',
				celular: 'fdglkdlfgk',
				creado: 'fdglkdlfgk',
				modificado: 'fdglkdlfgk',
				clients: 'fdglkdlfgk',
				departments: 'fdglkdlfgk',
				priorities: 'fdglkdlfgk',
				states: 'fdglkdlfgk',
				users: 'fdglkdlfgk',
				client_id: 1,
				department_id: 1,
				state_id: 1,
				user_id: 1,
				priority_id: 1,
				assigments: [],
				files: [],
			},
		]
		const filter = {
			titulo: 'kldsjfklsjfksdfj',
			email: 'dfs@fdjklg.com'
		}
		service.getAll(filter, 2).subscribe(tickets => {
			expect(tickets).toEqual(expectReturn, 'is equal')
		})
		const req = httpMock.expectOne(url + '/tickets?page=2&find={"titulo":"kldsjfklsjfksdfj","email":"dfs@fdjklg.com"}', 'call to api')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		httpMock.verify()
	})

	it('should return expected Ticket get list', () => {
		const expectReturn: Ticket[] = [
			{
				id: 1,
				titulo: 'fdglkdlfgk',
				content: 'fdglkdlfgk',
				keys: 'fdglkdlfgk',
				email: 'fdglkdlfgk',
				telefono: 'fdglkdlfgk',
				celular: 'fdglkdlfgk',
				creado: 'fdglkdlfgk',
				modificado: 'fdglkdlfgk',
				clients: 'fdglkdlfgk',
				departments: 'fdglkdlfgk',
				priorities: 'fdglkdlfgk',
				states: 'fdglkdlfgk',
				users: 'fdglkdlfgk',
				client_id: 1,
				department_id: 1,
				state_id: 1,
				user_id: 1,
				priority_id: 1,
				assigments: [],
				files: [],
			},
			{
				id: 2,
				titulo: 'fdglkdlfgk',
				content: 'fdglkdlfgk',
				keys: 'fdglkdlfgk',
				email: 'fdglkdlfgk',
				telefono: 'fdglkdlfgk',
				celular: 'fdglkdlfgk',
				creado: 'fdglkdlfgk',
				modificado: 'fdglkdlfgk',
				clients: 'fdglkdlfgk',
				departments: 'fdglkdlfgk',
				priorities: 'fdglkdlfgk',
				states: 'fdglkdlfgk',
				users: 'fdglkdlfgk',
				client_id: 1,
				department_id: 1,
				state_id: 1,
				user_id: 1,
				priority_id: 1,
				assigments: [],
				files: [],
			},
		]

		service.getList().subscribe(tickets => {
			expect(tickets).toEqual(expectReturn, 'is equal')
		})
		const req = httpMock.expectOne(url + '/tickets?type=list', 'call to api')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		httpMock.verify()

	})

	

	it('should return expected Ticket get by id', () => {
		const expectReturn: Ticket = {
			id: 1,
			titulo: 'fdglkdlfgk',
			content: 'fdglkdlfgk',
			keys: 'fdglkdlfgk',
			email: 'fdglkdlfgk',
			telefono: 'fdglkdlfgk',
			celular: 'fdglkdlfgk',
			creado: 'fdglkdlfgk',
			modificado: 'fdglkdlfgk',
			clients: 'fdglkdlfgk',
			departments: 'fdglkdlfgk',
			priorities: 'fdglkdlfgk',
			states: 'fdglkdlfgk',
			users: 'fdglkdlfgk',
			client_id: 1,
			department_id: 1,
			state_id: 1,
			user_id: 1,
			priority_id: 1,
			assigments: [],
			files: [],
		}


		service.getById(1).subscribe(tickets => {
			expect(tickets).toEqual(expectReturn, 'is equal')
		})
		const req = httpMock.expectOne(url + '/tickets/1', 'call to api')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		httpMock.verify()
	})

	it('should return expected Ticket post', () => {
		const newData = {
			titulo: 'fdglkdlfgk',
			content: 'fdglkdlfgk',
			keys: 'fdglkdlfgk',
			email: 'fdglkdlfgk',
			telefono: 'fdglkdlfgk',
			celular: 'fdglkdlfgk',
			creado: 'fdglkdlfgk',
			modificado: 'fdglkdlfgk',
			clients: 'fdglkdlfgk',
			departments: 'fdglkdlfgk',
			priorities: 'fdglkdlfgk',
			states: 'fdglkdlfgk',
			users: 'fdglkdlfgk',
			client_id: 1,
			department_id: 1,
			state_id: 1,
			user_id: 1,
			priority_id: 1,
			assigments: [],
			files: [],
		}

		const expectReturn: Ticket = {
			id: 1,
			titulo: 'fdglkdlfgk',
			content: 'fdglkdlfgk',
			keys: 'fdglkdlfgk',
			email: 'fdglkdlfgk',
			telefono: 'fdglkdlfgk',
			celular: 'fdglkdlfgk',
			creado: 'fdglkdlfgk',
			modificado: 'fdglkdlfgk',
			clients: 'fdglkdlfgk',
			departments: 'fdglkdlfgk',
			priorities: 'fdglkdlfgk',
			states: 'fdglkdlfgk',
			users: 'fdglkdlfgk',
			client_id: 1,
			department_id: 1,
			state_id: 1,
			user_id: 1,
			priority_id: 1,
			assigments: [],
			files: [],
		}

		service.create(newData).subscribe(tickets => {
			expect(tickets).toEqual(expectReturn, 'is equal')
		})
		const req = httpMock.expectOne(url + '/tickets', 'call to post api')
		expect(req.request.method).toBe('POST')
		req.flush(expectReturn)
		httpMock.verify()
	})

	it('should return expected Ticket put', () => {
		const newData: Ticket = {
			id: 1,
		titulo: 'fdglkdlfgk',
				content: 'fdglkdlfgk',
				keys: 'fdglkdlfgk',
				email: 'fdglkdlfgk',
				telefono: 'fdglkdlfgk',
				celular: 'fdglkdlfgk',
				creado: 'fdglkdlfgk',
				modificado: 'fdglkdlfgk',
				clients: 'fdglkdlfgk',
				departments: 'fdglkdlfgk',
				priorities: 'fdglkdlfgk',
				states: 'fdglkdlfgk',
				users: 'fdglkdlfgk',
				client_id: 1,
				department_id: 1,
				state_id: 1,
				user_id: 1,
				priority_id: 1,
				assigments: [],
				files: [],
		}

		const expectReturn: Ticket = {
			id: 1,
		titulo: 'fdglkdlfgk',
				content: 'fdglkdlfgk',
				keys: 'fdglkdlfgk',
				email: 'fdglkdlfgk',
				telefono: 'fdglkdlfgk',
				celular: 'fdglkdlfgk',
				creado: 'fdglkdlfgk',
				modificado: 'fdglkdlfgk',
				clients: 'fdglkdlfgk',
				departments: 'fdglkdlfgk',
				priorities: 'fdglkdlfgk',
				states: 'fdglkdlfgk',
				users: 'fdglkdlfgk',
				client_id: 1,
				department_id: 1,
				state_id: 1,
				user_id: 1,
				priority_id: 1,
				assigments: [],
				files: [],
		}

		service.update(newData).subscribe(tickets => {
			expect(tickets).toEqual(expectReturn, 'is equal')
		})
		const req = httpMock.expectOne(url + '/tickets/1', 'call to post api')
		expect(req.request.method).toBe('PUT')
		req.flush(expectReturn)
		httpMock.verify()
	})
	it('should return expected Ticket delete', () => {

		service.delete(1).subscribe(reponse => {
			expect(reponse).toEqual(3, 'is equal')
		})
		const req = httpMock.expectOne(url + '/tickets/1', 'call to post api')
		expect(req.request.method).toBe('DELETE')
		req.flush(3)
		httpMock.verify()
	})


	it('should return expected Ticket patch', () => {
		const newData = {
			user_id: 1,
			edit: true,
		}

		service.patch(1, newData, 0).subscribe(tickets => {
			expect(tickets).toEqual(3, 'is equal')
		})
		const req = httpMock.expectOne(url + '/tickets/1?type=0', 'call to post api')
		expect(req.request.method).toBe('PATCH')
		req.flush(3)
		httpMock.verify()
	})
})
