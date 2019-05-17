import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticiansComponent } from './politicians.component';

describe('PoliticiansComponent', () => {
  let component: PoliticiansComponent;
  let fixture: ComponentFixture<PoliticiansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoliticiansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliticiansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
