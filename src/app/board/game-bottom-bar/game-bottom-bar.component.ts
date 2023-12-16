import { Component, OnInit } from '@angular/core';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { setScore } from '../../state-management/scoreState';
import { setlevel } from "../../state-management/levelState";

@Component({
  selector: 'app-game-bottom-bar',
  templateUrl: './game-bottom-bar.component.html',
  styleUrls: ['./game-bottom-bar.component.scss']
})
export class GameBottomBarComponent implements OnInit {

  thumbsUp = faThumbsUp;
  score: number = -1;
  faCalculator = faCalculator;
  oneMoreAnimation: boolean = false;
  record: number | null = null;
  levelValue!: number;

  constructor(private store: Store<{ score: number }>, private level: Store<{ level: number }>) { }

  ngOnInit(): void {

    // Set the record.
    if (localStorage.getItem('record')) {
      this.record = parseInt(localStorage.getItem('record')!);
    }else{
      localStorage.setItem('record', '0');
      this.record = 0;
    }

    // Subscribe to the score store.
    this.store.select('score').subscribe({
      next: (score) => {

        // Update the score.
        this.score = score;

        // Update the record.
        this.updateRecord(this.score);

        // Animate the score.
        if (this.score > 0) {
          this.oneMoreAnimation = true;
          setTimeout(() => {
            this.oneMoreAnimation = false;
          }, 1000);
        }
      }
    });

    // Subscribe and get level.
    this.level.select('level').subscribe({
      next: (level) => {
        this.levelValue = level;
      }
    });
  }

  /**
   * Update the record.
   * If the score is higher than the record, update the record.
   * @param currentScore The current score.
   */
  updateRecord(currentScore: number): void {
    if (localStorage.getItem('record')) {
      if (currentScore >= parseInt(localStorage.getItem('record')!)) {
        localStorage.setItem('record', currentScore.toString());
        this.record = currentScore;
      }
    }
  }

  /**
   * Reset the score.
   */
  newGame(): void {
    this.score = 0;
    this.store.dispatch(setScore(0));
  }

  /**
   * Update the level.
   */
  changeLevel(): void {
    if (this.levelValue === 3) {
      this.level.dispatch(setlevel(1));
    }else {
      this.level.dispatch(setlevel(this.levelValue + 1));
    }
  }
}
