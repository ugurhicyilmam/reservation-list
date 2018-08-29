import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const appRoutes: Routes = [
  {
    path: "reservations",
    loadChildren: "./pages/reservation-list/reservation-list.module#ReservationListModule"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: false })],
  exports: [RouterModule],
  declarations: [],
  providers: []
})
export class AppRoutingModule {}
