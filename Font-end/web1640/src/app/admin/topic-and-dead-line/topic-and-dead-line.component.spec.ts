import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicAndDeadLineComponent } from './topic-and-dead-line.component';

describe('TopicAndDeadLineComponent', () => {
  let component: TopicAndDeadLineComponent;
  let fixture: ComponentFixture<TopicAndDeadLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicAndDeadLineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicAndDeadLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
