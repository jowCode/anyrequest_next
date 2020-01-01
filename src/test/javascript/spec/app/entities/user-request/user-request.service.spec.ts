import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { UserRequestService } from 'app/entities/user-request/user-request.service';
import { IUserRequest, UserRequest } from 'app/shared/model/user-request.model';
import { Urgency } from 'app/shared/model/enumerations/urgency.model';

describe('Service Tests', () => {
  describe('UserRequest Service', () => {
    let injector: TestBed;
    let service: UserRequestService;
    let httpMock: HttpTestingController;
    let elemDefault: IUserRequest;
    let expectedResult: IUserRequest | IUserRequest[] | boolean | null;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(UserRequestService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new UserRequest(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', Urgency.HIGH, currentDate, 0, false, false);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            validTo: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a UserRequest', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            validTo: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            validTo: currentDate
          },
          returnedFromService
        );
        service
          .create(new UserRequest())
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a UserRequest', () => {
        const returnedFromService = Object.assign(
          {
            requestingUser: 'BBBBBB',
            title: 'BBBBBB',
            description: 'BBBBBB',
            urgency: 'BBBBBB',
            validTo: currentDate.format(DATE_TIME_FORMAT),
            contributorCount: 1,
            hasContributed: true,
            isBlocked: true
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            validTo: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of UserRequest', () => {
        const returnedFromService = Object.assign(
          {
            requestingUser: 'BBBBBB',
            title: 'BBBBBB',
            description: 'BBBBBB',
            urgency: 'BBBBBB',
            validTo: currentDate.format(DATE_TIME_FORMAT),
            contributorCount: 1,
            hasContributed: true,
            isBlocked: true
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            validTo: currentDate
          },
          returnedFromService
        );
        service
          .query()
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a UserRequest', () => {
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
