import { NgModule } from "@angular/core";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ReservationListService } from "./services/reservation-list/reservation-list.service";
import { HttpClientModule } from "@angular/common/http";
import { MultiSelectComponent } from "./components/multi-select/multi-select.component";
import { OrderPipe } from "./pipes/order.pipe";

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  exports: [
    // modules
    CommonModule,
    FormsModule,
    RouterModule,
    // components
    NavigationComponent,
    MultiSelectComponent,
    // pipes
    OrderPipe
  ],
  declarations: [NavigationComponent, MultiSelectComponent, OrderPipe],
  providers: [ReservationListService]
})
export class SharedModule {}
