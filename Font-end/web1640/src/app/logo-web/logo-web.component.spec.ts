import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoWebComponent } from './logo-web.component';

describe('LogoWebComponent', () => {
  let component: LogoWebComponent;
  let fixture: ComponentFixture<LogoWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoWebComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
