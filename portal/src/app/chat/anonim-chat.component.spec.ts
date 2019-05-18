import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnonimChatComponent } from './anonim-chat.component';

describe('ChatComponent', () => {
  let component: AnonimChatComponent;
  let fixture: ComponentFixture<AnonimChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnonimChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnonimChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
