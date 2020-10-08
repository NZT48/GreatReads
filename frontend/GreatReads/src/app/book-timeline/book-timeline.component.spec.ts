import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTimelineComponent } from './book-timeline.component';

describe('BookTimelineComponent', () => {
  let component: BookTimelineComponent;
  let fixture: ComponentFixture<BookTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
