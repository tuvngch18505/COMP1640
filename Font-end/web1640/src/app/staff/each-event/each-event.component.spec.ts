import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EachEventComponent } from './each-event.component';

describe('EachEventComponent', () => {
  let component: EachEventComponent;
  let fixture: ComponentFixture<EachEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EachEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EachEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
