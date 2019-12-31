import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { AnyrequestNextTestModule } from '../../../test.module';
import { UserRequestDeleteDialogComponent } from 'app/entities/user-request/user-request-delete-dialog.component';
import { UserRequestService } from 'app/entities/user-request/user-request.service';

describe('Component Tests', () => {
  describe('UserRequest Management Delete Component', () => {
    let comp: UserRequestDeleteDialogComponent;
    let fixture: ComponentFixture<UserRequestDeleteDialogComponent>;
    let service: UserRequestService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AnyrequestNextTestModule],
        declarations: [UserRequestDeleteDialogComponent]
      })
        .overrideTemplate(UserRequestDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UserRequestDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserRequestService);
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
