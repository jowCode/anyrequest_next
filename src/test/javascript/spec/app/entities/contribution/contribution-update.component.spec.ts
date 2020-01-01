import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { AnyrequestNextTestModule } from '../../../test.module';
import { ContributionUpdateComponent } from 'app/entities/contribution/contribution-update.component';
import { ContributionService } from 'app/entities/contribution/contribution.service';
import { Contribution } from 'app/shared/model/contribution.model';

describe('Component Tests', () => {
  describe('Contribution Management Update Component', () => {
    let comp: ContributionUpdateComponent;
    let fixture: ComponentFixture<ContributionUpdateComponent>;
    let service: ContributionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AnyrequestNextTestModule],
        declarations: [ContributionUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ContributionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ContributionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ContributionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Contribution(123);
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
        const entity = new Contribution();
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
