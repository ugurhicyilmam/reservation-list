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
export class ReservationListFilterComponent implements OnInit {
  public filter: ReservationFilter = {};

  @Output()
  public filterChange: EventEmitter<ReservationFilter> = new EventEmitter();

  public statusOptions: string[];
  public shiftOptions: string[];
  public areaOptions: string[];
  public dateOptions: string[];

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
    });
  }

  public onSelectionChange(selectedOptions: string[], key: string): void {
    this.filter[key] = selectedOptions;
    this.filter["guest"] = this.guest;
    this.filterChange.emit(this.filter);
  }

  private getValuesInObject(obj: any): string[] {
    return Object.keys(obj).map(s => obj[s]) as string[];
  }

  ngOnInit() {}
}
