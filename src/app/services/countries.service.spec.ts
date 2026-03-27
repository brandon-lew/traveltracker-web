import { inject, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

// SERVICES
import { CountriesService } from './countries.service';

// INTERFACES
import { ICountry } from '../interfaces/country.model';

describe('CountriesService', () => {
  let countriesService: CountriesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CountriesService],
    });
    countriesService = TestBed.inject(CountriesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(countriesService).toBeTruthy();
  });

  it('should be initialized', inject(
    [CountriesService],
    (countriesService: CountriesService) => {
      expect(countriesService).toBeTruthy();
    },
  ));

  it('#getCountries should return expected countries (HttpClient called once)', (done: DoneFn) => {
    const expectedCountries: ICountry[] = [
      { name: 'A', continent: 'AA', latlng: [], checked: false },
      { name: 'B', continent: 'BB', latlng: [], checked: true },
    ];

    countriesService.getCountries().subscribe({
      next: (data) => {
        expect(data)
          .withContext('expected countries')
          .toEqual(expectedCountries);
        done();
      },
      error: done.fail,
    });

    const req = httpMock.expectOne('assets/data/countries.json');
    expect(req.request.method).toBe('GET');
    req.flush(expectedCountries);
  });
});
