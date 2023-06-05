import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesttemComponent } from './testtem.component';

describe('TesttemComponent', () => {
  let component: TesttemComponent;
  let fixture: ComponentFixture<TesttemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TesttemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TesttemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
