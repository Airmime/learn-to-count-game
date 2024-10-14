import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import localeFr from '@angular/common/locales/fr';
import localeEn from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';
import { Store } from '@ngrx/store';
import { setScore } from '../../state-management/scoreState';
import { TranslateService } from '@ngx-translate/core';
import { ModeType } from "../../state-management/modeState";

@Component({
  selector: 'app-board-game',
  templateUrl: './board-game.component.html',
  styleUrls: ['./board-game.component.scss']
})
export class BoardGameComponent implements OnInit, AfterViewInit{

  firstNumber: number = 4;
  secondNumber: number = 5;
  result: number | undefined | null;
  date = new Date();
  score: number = 0;
  error: boolean = false;
  success: boolean = false;
  levelValue!: number;
  modeValue!: string;
  @ViewChild('resultInput') resultInput: ElementRef | undefined;

  constructor(
    private store: Store<{ score: number }>,
    public translate: TranslateService,
    private mode: Store<{ mode: ModeType }>,
    private level: Store<{ level: number }>) {

    if (translate.currentLang == 'fr') {
      registerLocaleData(localeFr, 'fr');
    }else {
      registerLocaleData(localeEn, 'en');
    }
  }

  ngAfterViewInit(): void {
    // Focus on the result input.
    this.resultInput?.nativeElement.focus();
  }

  ngOnInit(): void {
    this.mode.select('mode').subscribe({
      next: (mode) => {
        switch (mode) {
          case 'addition':
            this.modeValue = '+';
            break;
          case 'subtraction':
            this.modeValue = '-';
            break
        }
        this.generateNumbers();
      }
    });

    // Generate random numbers.
    this.generateNumbers();

    // Subscribe to the score store, if new game.
    this.store.select('score').subscribe({
      next: (score) => {
        this.score = score;
      }
    });

    this.level.select('level').subscribe({
      next: (level) => {
        this.levelValue = level;
        this.generateNumbers();
      }
    });
  }

  /**
   * Generate random numbers,
   */
  generateNumbers(): void {
    let limit: number = 5;

    if (this.levelValue === 2) {
      limit = 10;
    } else if (this.levelValue === 3) {
      limit = 20;
    }

    // Generate numbers based on the mode
    if (this.modeValue === '-') {
      // Ensure firstNumber is greater than secondNumber for subtraction
      do {
        this.firstNumber = Math.floor(Math.random() * limit) + 1;
        this.secondNumber = Math.floor(Math.random() * limit) + 1;
      } while (this.firstNumber <= this.secondNumber);
    } else {
      // For addition or other modes, generate numbers normally
      this.firstNumber = Math.floor(Math.random() * limit) + 1;
      this.secondNumber = Math.floor(Math.random() * limit) + 1;
    }

    this.result = null;
  }

  incrementScore(): void {
    this.store.dispatch(setScore(this.score));
  }

  /**
   * Check if the result is correct.
   * If yes, generate new numbers.
   */
  checkResult(): void {
    // Check if the result is an integer.
    if (this.result && !Number.isInteger(this.result)) {
      this.result = undefined;
      return;
    }

    // Determine the expected result based on the operation mode.
    let expectedResult: number;
    if (this.modeValue === '+') {
      expectedResult = this.firstNumber + this.secondNumber;
    } else if (this.modeValue === '-') {
      expectedResult = this.firstNumber - this.secondNumber;
    } else {
      // If the mode is not recognized, exit the function.
      return;
    }

    // Check if the result is correct.
    if (this.result && (this.result.toString().length == expectedResult.toString().length)) {
      if (this.result === expectedResult) {
        this.error = false;
        this.success = true;
        this.score++;

        // Wait 1 second before generating new numbers.
        setTimeout(() => {
          this.incrementScore();
          this.generateNumbers();
          this.success = false;
        }, 1000);

        // Wait 1 second before focusing on the result input.
        setTimeout(() => {
          this.resultInput?.nativeElement.focus();
        }, 1000);

      } else {
        this.error = true;

        // Wait 750ms before removing the result.
        setTimeout(() => {
          this.result = null;
        }, 750);
      }
    }
  }
}
