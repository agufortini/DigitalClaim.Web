import { Component, OnInit } from '@angular/core';

// ENTIDADES
import { SelectRating } from 'src/app/_entities/reclamo.entities';

@Component({
  selector: 'app-modal-rating',
  templateUrl: './modal-rating.component.html',
  styles: []
})
export class ModalRatingComponent implements OnInit {
  objRating: SelectRating;
  ratingArr = [];
  
  constructor() { }

  ngOnInit() {
  }


}
