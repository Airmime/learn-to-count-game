import { LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { AppModule } from 'src/app/app.module';

import { BoardGameComponent } from './board-game.component';

describe('BoardGameComponent', () => {
  let component: BoardGameComponent;
  let fixture: ComponentFixture<BoardGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardGameComponent ],
      imports: [
        AppModule,
        StoreModule.forRoot(provideMockStore),
      ],
      providers: [
        { provide: LOCALE_ID, useValue: 'fr-FR'},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
