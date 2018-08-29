import { Pipe, PipeTransform } from "@angular/core";

import * as _ from "lodash";

@Pipe({
  name: "order"
})
export class OrderPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    const orderBy = args[0];
    const order = args[1];
    if (!orderBy) {
      return value;
    }
    return _.orderBy(value, [orderBy], [order]);
  }
}
