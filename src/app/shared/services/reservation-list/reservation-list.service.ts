import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, filter } from "rxjs/operators";

import { Reservation } from "./reservation";
import { ReservationShift } from "./reservation-shift";
import { ReservationFilter } from "./reservation-filter";
import { ReservationDate } from "./reservation-date";

@Injectable()
export class ReservationListService {
  private activeFilter;

  constructor(private httpClient: HttpClient) {}

  public getReservations(filterArgs: ReservationFilter): Observable<Reservation[]> {
    this.activeFilter = filterArgs;

    return this.httpClient.get<Reservation[]>("assets/data/reservations.json").pipe(
      map(this.mapReservations),
      map(this.filterReservations.bind(this))
    );
  }

  private mapReservations(response) {
    if (response && response["reservations"]) {
      return response["reservations"];
    }
    return response;
  }

  /**
   * filters reservations according to parameter
   * @param filter filter fields and values
   */
  private filterReservations(reservations: Reservation[]): Reservation[] {
    if (!this.activeFilter) {
      return reservations;
    }
    reservations = this.filterBySelections(reservations);
    reservations = this.searchByGuest(reservations);
    reservations = this.filterByDate(reservations);
    return reservations;
  }

  private filterBySelections(reservations: Reservation[]): Reservation[] {
    for (const key in this.activeFilter) {
      if (this.activeFilter[key] && this.activeFilter[key].length > 0) {
        reservations = reservations.filter(r => {
          const f = this.activeFilter[key];
          if (key !== "guest" && key !== "date") {
            return f.indexOf(r[key]) !== -1;
          }
          return true;
        });
      }
    }
    return reservations;
  }

  private filterByDate(reservations: Reservation[]): Reservation[] {
    if (this.activeFilter["date"] && this.activeFilter["date"].length > 0) {
      const now = new Date().getTime();
      const f = this.activeFilter["date"];
      reservations = reservations.filter(r => {
        const endsAt = new Date(r.end).getTime();
        return (
          (f.indexOf(ReservationDate.PAST) !== -1 && now > endsAt) ||
          (f.indexOf(ReservationDate.FUTURE) !== -1 && now <= endsAt)
        );
      });
    }
    return reservations;
  }

  private searchByGuest(reservations: Reservation[]): Reservation[] {
    if (this.activeFilter["guest"]) {
      const words = this.activeFilter["guest"].split(" ");
      reservations = reservations.filter(r => {
        for (const word of words) {
          const searchStr = word.toLowerCase();
          const firstName = r.customer.firstName.toLowerCase();
          const lastName = r.customer.lastName.toLowerCase();
          if (firstName.indexOf(searchStr) !== -1 || lastName.indexOf(searchStr) !== -1) {
            return true;
          }
        }
        return false;
      });
    }
    return reservations;
  }
}
