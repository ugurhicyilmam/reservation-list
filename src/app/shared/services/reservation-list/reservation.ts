import { ReservationStatus } from "./reservation-status";
import { ReservationArea } from "./reservation-area";
import { ReservationShift } from "./reservation-shift";

export interface Reservation {
  id: number;
  businessDate: string;
  status: ReservationStatus;
  shift: ReservationShift;
  start: string;
  end: string;
  quantity: string;
  customer: {
    firstName: string;
    lastName: string;
  };
  area: ReservationArea;
  guestNotes: string;
}
