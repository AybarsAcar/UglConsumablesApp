import { Consumable } from './consumable';

export default interface Order {
  id: number;
  serviceOrderId: number;
  areaOfWorkDescription: string;
  comment: string;
  orderItems: OrderItem[];
}

export class OrderItem {
  sapId: number = 0;
  description: string = '';
  quantity: number = 0;

  constructor(consumable?: Consumable) {
    if (consumable) {
      this.sapId = consumable.sapId;
      this.description = consumable.description;
      this.quantity = 0;
    }
  }
}

export class OrderFormValues {
  serviceOrderId: number | undefined;
  areaOfWorkDescription: string = '';
  comment: string = '';
  orderItems: OrderItem[] = [];

  constructor(order?: OrderFormValues) {
    if (order) {
      this.serviceOrderId = order.serviceOrderId;
      this.areaOfWorkDescription = order.areaOfWorkDescription;
      this.comment = order.comment;
      this.orderItems = order.orderItems;
    }
  }
}
