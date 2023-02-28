import { Component, OnInit } from '@angular/core';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { setScore } from '../../state-management/scoreState';

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

  constructor(private store: Store<{ score: number }>) { }

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
  }

  /**
   * Update the record.
   * If the score is higher than the record, update the record.
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
}
