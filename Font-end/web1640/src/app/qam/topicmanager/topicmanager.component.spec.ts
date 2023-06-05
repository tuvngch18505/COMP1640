import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicmanagerComponent } from './topicmanager.component';

describe('TopicmanagerComponent', () => {
  let component: TopicmanagerComponent;
  let fixture: ComponentFixture<TopicmanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicmanagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
