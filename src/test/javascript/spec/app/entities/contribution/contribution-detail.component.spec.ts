import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AnyrequestNextTestModule } from '../../../test.module';
import { ContributionDetailComponent } from 'app/entities/contribution/contribution-detail.component';
import { Contribution } from 'app/shared/model/contribution.model';

describe('Component Tests', () => {
  describe('Contribution Management Detail Component', () => {
    let comp: ContributionDetailComponent;
    let fixture: ComponentFixture<ContributionDetailComponent>;
    const route = ({ data: of({ contribution: new Contribution(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AnyrequestNextTestModule],
        declarations: [ContributionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ContributionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ContributionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load contribution on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.contribution).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
