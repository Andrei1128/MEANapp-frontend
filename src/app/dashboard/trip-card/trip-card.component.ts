import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.scss'],
})
export class TripCardComponent implements OnInit {
  @Input() trip: any;
  @Output() delete = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {}

  deleteTrip() {
    this.delete.emit();
  }
}
