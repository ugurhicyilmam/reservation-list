import { Component, OnInit, Input } from "@angular/core";
import { Reservation } from "../../../../shared/services/reservation-list/reservation";

@Component({
  selector: "app-reservation-list-table",
  templateUrl: "reservation-list-table.component.html",
  styleUrls: ["reservation-list-table.component.scss"]
})
/**
 * Table for reservation list
 */
export class ReservationListTableComponent implements OnInit {
  /**
   * Reservation list to be listed on table
   */
  @Input()
  public reservations: Reservation[];

  public sortField: string;
  public desc: boolean = true;

  constructor() {}

  ngOnInit() {}

  /**
   * Changes sorting field or sorting-order
   * @param field Sorting field
   */
  public sortBy(field: string): void {
    if (this.sortField === field) {
      this.desc = !this.desc;
    } else {
      this.sortField = field;
      this.desc = true;
    }
  }
}
