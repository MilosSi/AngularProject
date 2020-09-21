import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowwatchesComponent } from './showwatches.component';

describe('ShowwatchesComponent', () => {
  let component: ShowwatchesComponent;
  let fixture: ComponentFixture<ShowwatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowwatchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowwatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
