import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";

import { ReservationListService } from "../../shared/services/reservation-list/reservation-list.service";
import { Reservation } from "../../shared/services/reservation-list/reservation";
import { ReservationFilter } from "../../shared/services/reservation-list/reservation-filter";

@Component({
  templateUrl: "reservation-list.component.html",
  styleUrls: ["reservation-list.component.scss"]
})
/**
 * Main component for reservation-list page. This is a smart component, which handles data-flow for reservation-list.
 */
export class ReservationListComponent implements OnInit, OnDestroy {
  public reservations: Reservation[];
  public reservations$: Subscription;

  constructor(private reservationListService: ReservationListService) {}

  ngOnInit() {
    this.reservations$ = this.reservationListService.getReservations(null).subscribe(reservations => {
      this.reservations = reservations;
    });
  }

  ngOnDestroy(): void {
    this.reservations$.unsubscribe();
  }

  /**
   * Handler for reservation-list-filter. Makes new request from 'server' when filter updated.
   * @param filter filter to apply reservation-list
   */
  public onFilterChange(filter: ReservationFilter) {
    this.reservations$.unsubscribe();
    this.reservations$ = this.reservationListService.getReservations(filter).subscribe(reservations => {
      this.reservations = reservations;
    });
  }
}
