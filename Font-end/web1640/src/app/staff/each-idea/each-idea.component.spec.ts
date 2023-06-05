import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EachIdeaComponent } from './each-idea.component';

describe('EachIdeaComponent', () => {
  let component: EachIdeaComponent;
  let fixture: ComponentFixture<EachIdeaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EachIdeaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EachIdeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
