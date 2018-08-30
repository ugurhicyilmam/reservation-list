import { Component, OnInit, Output, EventEmitter } from "@angular/core";

import { ReservationStatus } from "../../../../shared/services/reservation-list/reservation-status";
import { ReservationShift } from "../../../../shared/services/reservation-list/reservation-shift";
import { ReservationArea } from "../../../../shared/services/reservation-list/reservation-area";
import { ReservationFilter } from "../../../../shared/services/reservation-list/reservation-filter";
import { ReservationDate } from "../../../../shared/services/reservation-list/reservation-date";

import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: "app-reservation-list-filter",
  templateUrl: "reservation-list-filter.component.html",
  styleUrls: ["reservation-list-filter.component.scss"]
})
/**
 * The filter component for reservation list
 */
export class ReservationListFilterComponent implements OnInit {
  public filter: ReservationFilter = {};

  /**
   * Event emitted when user changes filter selection
   */
  @Output()
  public filterChange: EventEmitter<ReservationFilter> = new EventEmitter();
  public statusOptions: string[];
  public shiftOptions: string[];
  public areaOptions: string[];
  public dateOptions: string[];

  public searchLoading: boolean = false;

  public guest: string;
  public guest$: Subject<string> = new Subject();

  constructor() {
    this.statusOptions = this.getValuesInObject(ReservationStatus);
    this.shiftOptions = this.getValuesInObject(ReservationShift);
    this.areaOptions = this.getValuesInObject(ReservationArea);
    this.dateOptions = this.getValuesInObject(ReservationDate);
    // debounce is added to simulate real use-case
    this.guest$.pipe(debounceTime(500)).subscribe(text => {
      this.filter["guest"] = text;
      this.filterChange.emit(this.filter);
      this.searchLoading = false;
    });
  }

  /**
   * Event handler for multi-select
   * @param selectedOptions Selected options from multi-select
   * @param key Name of the multi-select
   */
  public onSelectionChange(selectedOptions: string[], key: string): void {
    this.filter[key] = selectedOptions;
    this.filter["guest"] = this.guest;
    this.filterChange.emit(this.filter);
  }

  /**
   * Event handler for search input.
   * Passes latest value to guest$ subject, which adds 500ms latency to prevent continuous searching.
   */
  public onSearchChange(guest: string): void {
    this.guest$.next(guest);
    this.searchLoading = true;
  }

  private getValuesInObject(obj: any): string[] {
    return Object.keys(obj).map(s => obj[s]) as string[];
  }

  ngOnInit() {}
}
