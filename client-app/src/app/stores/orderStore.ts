import { makeAutoObservable } from 'mobx';
import agent from '../api/agent';
import { OrderFormValues } from '../models/order';

export default class OrderStore {
  isLoading = false;

  orderToCreate: OrderFormValues = new OrderFormValues();

  orderItemsToAdd = new Map<number, number>();

  constructor() {
    makeAutoObservable(this);
  }

  createOrder = async (order: OrderFormValues) => {
    this.isLoading = true;

    try {
      await agent.OrderRequests.create(order);
      this.isLoading = false;
    } catch (error) {
      console.log(error);
      this.isLoading = false;
    }
  };

  setServiceOrder = async (serviceOrder: number) => {
    this.orderToCreate.serviceOrder = serviceOrder;

    this.isLoading = true;
  };
}
