import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { TemplateService } from './template.service'
import { Template } from '../models'
import { environment } from '../../../../environments/environment'

describe('TemplateService', () => {
	let service: TemplateService
	let httpMock: HttpTestingController
	const url = environment.apiServer
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [TemplateService],
			imports: [HttpClientTestingModule],
		})

		service = TestBed.get(TemplateService)
		httpMock = TestBed.get(HttpTestingController)
	})

	it('should be created', () => {
		expect(service).toBeTruthy()
	})

	it('should return expected Template get all', () => {
		const expectReturn: Template[] = [
			{
				id: 1,
				descripcion: 'dfksdjfksfdj',
				body: 'dfksdjfksfdj',
				creado: 'dfksdjfksfdj',
				modificado: 'dfksdjfksfdj',
			},
			{
				id: 2,
				descripcion: 'dfksdjfksfdj',
				body: 'dfksdjfksfdj',
				creado: 'dfksdjfksfdj',
				modificado: 'dfksdjfksfdj',
			},
		]
		service.getAll().subscribe(templates => {
			expect(templates).toEqual(expectReturn, 'is equal')
		})
		const req = httpMock.expectOne(url + '/templates', 'call to api')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		httpMock.verify()
	})


	it('should return expected Template get by id', () => {
		const expectReturn: Template = {
			id: 1,
			descripcion: 'dfksdjfksfdj',
			body: 'dfksdjfksfdj',
			creado: 'dfksdjfksfdj',
			modificado: 'dfksdjfksfdj',
		}


		service.getById(1).subscribe(templates => {
			expect(templates).toEqual(expectReturn, 'is equal')
		})
		const req = httpMock.expectOne(url + '/templates/1', 'call to api')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		httpMock.verify()
	})

	it('should return expected Template post', () => {
		const newData = {
			descripcion: 'dfksdjfksfdj',
			body: 'dfksdjfksfdj',
			creado: 'dfksdjfksfdj',
			modificado: 'dfksdjfksfdj',
		}

		const expectReturn: Template = {
			id: 1,
			descripcion: 'dfksdjfksfdj',
			body: 'dfksdjfksfdj',
			creado: 'dfksdjfksfdj',
			modificado: 'dfksdjfksfdj',
		}

		service.create(newData).subscribe(templates => {
			expect(templates).toEqual(expectReturn, 'is equal')
		})
		const req = httpMock.expectOne(url + '/templates', 'call to post api')
		expect(req.request.method).toBe('POST')
		req.flush(expectReturn)
		httpMock.verify()
	})

	it('should return expected Template put', () => {
		const newData: Template = {
			id: 1,
			descripcion: 'dfksdjfksfdj',
			body: 'dfksdjfksfdj',
			creado: 'dfksdjfksfdj',
			modificado: 'dfksdjfksfdj',
		}

		const expectReturn: Template = {
			id: 1,
			descripcion: 'dfksdjfksfdj',
			body: 'dfksdjfksfdj',
			creado: 'dfksdjfksfdj',
			modificado: 'dfksdjfksfdj',
		}

		service.update(newData).subscribe(templates => {
			expect(templates).toEqual(expectReturn, 'is equal')
		})
		const req = httpMock.expectOne(url + '/templates/1', 'call to post api')
		expect(req.request.method).toBe('PUT')
		req.flush(expectReturn)
		httpMock.verify()
	})
	it('should return expected Template delete', () => {

		service.delete(1).subscribe(reponse => {
			expect(reponse).toEqual(3, 'is equal')
		})
		const req = httpMock.expectOne(url + '/templates/1', 'call to post api')
		expect(req.request.method).toBe('DELETE')
		req.flush(3)
		httpMock.verify()
	})
})
