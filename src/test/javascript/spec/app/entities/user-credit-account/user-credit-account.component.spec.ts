import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Data } from '@angular/router';

import { AnyrequestNextTestModule } from '../../../test.module';
import { UserCreditAccountComponent } from 'app/entities/user-credit-account/user-credit-account.component';
import { UserCreditAccountService } from 'app/entities/user-credit-account/user-credit-account.service';
import { UserCreditAccount } from 'app/shared/model/user-credit-account.model';

describe('Component Tests', () => {
  describe('UserCreditAccount Management Component', () => {
    let comp: UserCreditAccountComponent;
    let fixture: ComponentFixture<UserCreditAccountComponent>;
    let service: UserCreditAccountService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AnyrequestNextTestModule],
        declarations: [UserCreditAccountComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              data: {
                subscribe: (fn: (value: Data) => void) =>
                  fn({
                    pagingParams: {
                      predicate: 'id',
                      reverse: false,
                      page: 0
                    }
                  })
              }
            }
          }
        ]
      })
        .overrideTemplate(UserCreditAccountComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserCreditAccountComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserCreditAccountService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new UserCreditAccount(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.userCreditAccounts && comp.userCreditAccounts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new UserCreditAccount(123)],
            headers
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.userCreditAccounts && comp.userCreditAccounts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      comp.ngOnInit();
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['id,desc']);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // INIT
      comp.ngOnInit();

      // GIVEN
      comp.predicate = 'name';

      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['name,desc', 'id']);
    });
  });
});
