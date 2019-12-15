import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { AnyrequestNextTestModule } from '../../../test.module';
import { UserCreditAccountUpdateComponent } from 'app/entities/user-credit-account/user-credit-account-update.component';
import { UserCreditAccountService } from 'app/entities/user-credit-account/user-credit-account.service';
import { UserCreditAccount } from 'app/shared/model/user-credit-account.model';

describe('Component Tests', () => {
  describe('UserCreditAccount Management Update Component', () => {
    let comp: UserCreditAccountUpdateComponent;
    let fixture: ComponentFixture<UserCreditAccountUpdateComponent>;
    let service: UserCreditAccountService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AnyrequestNextTestModule],
        declarations: [UserCreditAccountUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(UserCreditAccountUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserCreditAccountUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserCreditAccountService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new UserCreditAccount(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new UserCreditAccount();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
