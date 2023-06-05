import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QamComponent } from './qam.component';

describe('QamComponent', () => {
  let component: QamComponent;
  let fixture: ComponentFixture<QamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
