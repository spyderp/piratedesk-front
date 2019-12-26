import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommentsService } from './comments.service';
import { Message } from '../models';
import { environment } from '../../../../environments/environment'
describe('CommentsService', () => {
	let service: CommentsService
	let httpMock: HttpTestingController
	const url = environment.apiServer
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [CommentsService],
			imports: [HttpClientTestingModule],
		});
		service = TestBed.get(CommentsService)
		httpMock = TestBed.get(HttpTestingController)
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	})

	it('should return expected Message get all', () => {
		const expectReturn: Message[] = [
			{
				id: 1,
				body: 'kldsjfkjsfd',
				creado: new Date(),
				privado: false,
				ticket_id: 1,
				from_user_id: 1,
				to_user_id: 1
			},
			{
				id: 2,
				body: 'kldsjfkjsfd',
				creado: new Date(),
				privado: false,
				ticket_id: 1,
				from_user_id: 1,
				to_user_id: 1
			},
		]
		service.getAll().subscribe(messages => {
			expect(messages).toEqual(expectReturn, 'is equal')
		})
		const req = httpMock.expectOne(url + '/messages', 'call to api')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		httpMock.verify()
	})


	it('should return expected Message get by id', () => {
		const expectReturn: Message = {
			id: 1,
			body: 'kldsjfkjsfd',
				creado: new Date(),
				privado: false,
				ticket_id: 1,
				from_user_id: 1,
				to_user_id: 1
		}


		service.getById(1).subscribe(messages => {
			expect(messages).toEqual(expectReturn, 'is equal')
		})
		const req = httpMock.expectOne(url + '/messages/1', 'call to api')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		httpMock.verify()
	})

	it('should return expected Message post', () => {
		const newData = {
			body: 'kldsjfkjsfd',
			creado: new Date(),
			privado: false,
			ticket_id: 1,
			from_user_id: 1,
			to_user_id: 1
		}

		const expectReturn: Message = {
			id: 1,
			body: 'kldsjfkjsfd',
			creado: new Date(),
			privado: false,
			ticket_id: 1,
			from_user_id: 1,
			to_user_id: 1
		}

		service.create(newData).subscribe(messages => {
			expect(messages).toEqual(expectReturn, 'is equal')
		})
		const req = httpMock.expectOne(url + '/messages', 'call to post api')
		expect(req.request.method).toBe('POST')
		req.flush(expectReturn)
		httpMock.verify()
	})

	it('should return expected Message put', () => {
		const newData: Message = {
			id: 1,
			body: 'kldsjfkjsfd',
			creado: new Date(),
			privado: false,
			ticket_id: 1,
			from_user_id: 1,
			to_user_id: 1
		}

		const expectReturn: Message = {
			id: 1,
			body: 'kldsjfkjsfd',
			creado: new Date(),
			privado: false,
			ticket_id: 1,
			from_user_id: 1,
			to_user_id: 1
		}

		service.update(newData).subscribe(messages => {
			expect(messages).toEqual(expectReturn, 'is equal')
		})
		const req = httpMock.expectOne(url + '/messages/1', 'call to post api')
		expect(req.request.method).toBe('PUT')
		req.flush(expectReturn)
		httpMock.verify()
	})
	it('should return expected Message delete', () => {

		service.delete(1).subscribe(reponse => {
			expect(reponse).toEqual(3, 'is equal')
		})
		const req = httpMock.expectOne(url + '/messages/1', 'call to post api')
		expect(req.request.method).toBe('DELETE')
		req.flush(3)
		httpMock.verify()
	})
})
