import { DatePipe, registerLocaleData } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../app.module';
import { BoardComponent } from './board.component';
import { LOCALE_ID } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import localeFr from '@angular/common/locales/fr';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  registerLocaleData(localeFr, 'fr-FR');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppModule, 
        DatePipe,
        StoreModule.forRoot(provideMockStore),
      ],
      declarations: [ BoardComponent],
      providers: [
        { provide: LOCALE_ID, useValue: 'fr-FR'},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
