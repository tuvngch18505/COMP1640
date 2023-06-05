import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitcherWrapperComponent } from './switcher-wrapper.component';

describe('SwitcherWrapperComponent', () => {
  let component: SwitcherWrapperComponent;
  let fixture: ComponentFixture<SwitcherWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitcherWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwitcherWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
