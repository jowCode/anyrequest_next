import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { AnyrequestNextTestModule } from '../../../test.module';
import { UserCreditAccountDeleteDialogComponent } from 'app/entities/user-credit-account/user-credit-account-delete-dialog.component';
import { UserCreditAccountService } from 'app/entities/user-credit-account/user-credit-account.service';

describe('Component Tests', () => {
  describe('UserCreditAccount Management Delete Component', () => {
    let comp: UserCreditAccountDeleteDialogComponent;
    let fixture: ComponentFixture<UserCreditAccountDeleteDialogComponent>;
    let service: UserCreditAccountService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AnyrequestNextTestModule],
        declarations: [UserCreditAccountDeleteDialogComponent]
      })
        .overrideTemplate(UserCreditAccountDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UserCreditAccountDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserCreditAccountService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
