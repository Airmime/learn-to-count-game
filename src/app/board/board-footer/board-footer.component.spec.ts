import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';

import { BoardFooterComponent } from './board-footer.component';

describe('BoardFooterComponent', () => {
  let component: BoardFooterComponent;
  let fixture: ComponentFixture<BoardFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [ BoardFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
