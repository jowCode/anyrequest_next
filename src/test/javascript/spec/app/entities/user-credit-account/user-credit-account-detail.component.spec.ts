import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AnyrequestNextTestModule } from '../../../test.module';
import { UserCreditAccountDetailComponent } from 'app/entities/user-credit-account/user-credit-account-detail.component';
import { UserCreditAccount } from 'app/shared/model/user-credit-account.model';

describe('Component Tests', () => {
  describe('UserCreditAccount Management Detail Component', () => {
    let comp: UserCreditAccountDetailComponent;
    let fixture: ComponentFixture<UserCreditAccountDetailComponent>;
    const route = ({ data: of({ userCreditAccount: new UserCreditAccount(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AnyrequestNextTestModule],
        declarations: [UserCreditAccountDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(UserCreditAccountDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UserCreditAccountDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.userCreditAccount).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
