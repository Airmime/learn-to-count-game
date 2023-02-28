import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { AppModule } from 'src/app/app.module';

import { GameBottomBarComponent } from './game-bottom-bar.component';

describe('GameBottomBarComponent', () => {
  let component: GameBottomBarComponent;
  let fixture: ComponentFixture<GameBottomBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameBottomBarComponent ],
      imports: [
        AppModule,
        StoreModule.forRoot(provideMockStore),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameBottomBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
