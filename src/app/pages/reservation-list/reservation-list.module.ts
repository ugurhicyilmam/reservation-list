import { NgModule } from "@angular/core";

import { ReservationListComponent } from "./reservation-list.component";
import { ReservationListRoutingRoutingModule } from "./reservation-list-routing.module";
import { ReservationListTableComponent } from "./components/reservation-list-table/reservation-list-table.component";
import { SharedModule } from "../../shared/shared.module";
import { ReservationStatusBulletComponent } from "./components/reservation-status-bullet/reservation-status-bullet.component";
import { ReservationListFilterComponent } from "./components/reservation-list-filter/reservation-list-filter.component";

@NgModule({
  imports: [ReservationListRoutingRoutingModule, SharedModule],
  exports: [],
  declarations: [
    ReservationListComponent,
    ReservationListTableComponent,
    ReservationStatusBulletComponent,
    ReservationListFilterComponent
  ],
  providers: []
})
export class ReservationListModule {}
