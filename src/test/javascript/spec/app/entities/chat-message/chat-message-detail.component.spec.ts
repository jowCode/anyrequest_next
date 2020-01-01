import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AnyrequestNextTestModule } from '../../../test.module';
import { ChatMessageDetailComponent } from 'app/entities/chat-message/chat-message-detail.component';
import { ChatMessage } from 'app/shared/model/chat-message.model';

describe('Component Tests', () => {
  describe('ChatMessage Management Detail Component', () => {
    let comp: ChatMessageDetailComponent;
    let fixture: ComponentFixture<ChatMessageDetailComponent>;
    const route = ({ data: of({ chatMessage: new ChatMessage(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AnyrequestNextTestModule],
        declarations: [ChatMessageDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ChatMessageDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ChatMessageDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load chatMessage on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.chatMessage).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
