import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaOfEventComponent } from './idea-of-event.component';

describe('IdeaOfEventComponent', () => {
  let component: IdeaOfEventComponent;
  let fixture: ComponentFixture<IdeaOfEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdeaOfEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdeaOfEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
