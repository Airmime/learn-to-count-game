import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { BtnComponent } from './design-system/components/btn/btn.component';
import { StartComponent } from './start/start.component';
import { BoardGameComponent } from './board/board-game/board-game.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GameBottomBarComponent } from './board/game-bottom-bar/game-bottom-bar.component';
import { BoardFooterComponent } from './board/board-footer/board-footer.component';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { scoreReducer } from './state-management/scoreState';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { WeatherComponent } from './board/board-game/weather/weather.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { levelReducer } from "./state-management/levelState";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    BtnComponent,
    StartComponent,
    BoardGameComponent,
    WeatherComponent,
    GameBottomBarComponent,
    BoardFooterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('score', scoreReducer),
    StoreModule.forFeature('level', levelReducer),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    })
  ],
  providers: [{provide: LOCALE_ID, useValue: 'fr' }],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
