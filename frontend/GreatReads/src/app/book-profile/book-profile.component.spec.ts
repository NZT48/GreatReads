import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MomentModule } from "ngx-moment";
import { BookProfileComponent } from './book-profile.component';

describe('BookProfileComponent', () => {
  let component: BookProfileComponent;
  let fixture: ComponentFixture<BookProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookProfileComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {

    imports: [MomentModule]

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
