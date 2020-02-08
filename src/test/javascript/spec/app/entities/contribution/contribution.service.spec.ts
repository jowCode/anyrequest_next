import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ContributionService } from 'app/entities/contribution/contribution.service';
import { IContribution, Contribution } from 'app/shared/model/contribution.model';
import { ContributionStatus } from 'app/shared/model/enumerations/contribution-status.model';

describe('Service Tests', () => {
  describe('Contribution Service', () => {
    let injector: TestBed;
    let service: ContributionService;
    let httpMock: HttpTestingController;
    let elemDefault: IContribution;
    let expectedResult: IContribution | IContribution[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ContributionService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new Contribution(0, 'AAAAAAA', 'AAAAAAA', ContributionStatus.PENDING);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Contribution', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Contribution()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Contribution', () => {
        const returnedFromService = Object.assign(
          {
            contributingUser: 'BBBBBB',
            contributionMessage: 'BBBBBB',
            contributionStatus: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Contribution', () => {
        const returnedFromService = Object.assign(
          {
            contributingUser: 'BBBBBB',
            contributionMessage: 'BBBBBB',
            contributionStatus: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Contribution', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
