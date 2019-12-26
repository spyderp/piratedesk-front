import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';

describe('AuthService', () => {
	let service: AuthService
	beforeEach(() => {
		TestBed.configureTestingModule({
		imports: [HttpClientModule],
		providers: [AuthService]
	})
		service = TestBed.get(AuthService)
	})

	it('should be created', () => {
		expect(service).toBeTruthy()
	})
})
