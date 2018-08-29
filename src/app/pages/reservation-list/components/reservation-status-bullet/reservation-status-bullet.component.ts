import { Component, OnInit, Input } from "@angular/core";

import { ReservationStatus } from "../../../../shared/services/reservation-list/reservation-status";

@Component({
  selector: "app-reservation-status-bullet",
  templateUrl: "reservation-status-bullet.component.html"
})
export class ReservationStatusBulletComponent implements OnInit {
  @Input()
  public status: ReservationStatus;

  public reservationStatus = ReservationStatus;

  constructor() {}

  ngOnInit() {}
}
