import { Component, OnInit, Input } from "@angular/core";
import { Reservation } from "../../../../shared/services/reservation-list/reservation";

@Component({
  selector: "app-reservation-list-table",
  templateUrl: "reservation-list-table.component.html",
  styleUrls: ["reservation-list-table.component.scss"]
})
export class ReservationListTableComponent implements OnInit {
  @Input()
  public reservations: Reservation[];

  constructor() {}

  ngOnInit() {}
}
