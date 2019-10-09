import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  encapsulation: ViewEncapsulation.Emulated
})
export class StarRatingComponent implements OnInit {

  @Input() public rating = 3;
  @Input() public starCount = 5;
  @Input() public color = 'accent';
  @Output() public ratingUpdated = new EventEmitter();

  public snackBarDuration = 3000;
  public ratingArr = [];

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit() {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }

  onClick(rating: number) {
    this.snackBar.open('Su calificación es: ' + rating, '', {
      duration: this.snackBarDuration
    });
    this.ratingUpdated.emit(rating);
    return false;
  }

  showIcon(index: number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

}
