import { makeAutoObservable, runInAction } from 'mobx';
import { history } from '../..';
import agent from '../api/agent';
import { OrderFormValues, OrderItem } from '../models/order';

export default class OrderStore {
  isLoading = false;

  orderToCreate: OrderFormValues = new OrderFormValues();

  orderItemsToAdd = new Map<number, OrderItem>();

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

  setServiceOrder = async (
    serviceOrder: number,
    areaOfWorkDescription: string
  ) => {
    this.orderToCreate.serviceOrderId = serviceOrder;
    this.orderToCreate.areaOfWorkDescription = areaOfWorkDescription;
  };

  confirmOrder = async (order: OrderFormValues) => {
    this.isLoading = true;
    try {
      await agent.OrderRequests.create(order);

      runInAction(() => {
        this.isLoading = false;
        this.orderToCreate = new OrderFormValues();
        this.orderItemsToAdd = new Map<number, OrderItem>();
      });

      history.push('/');
    } catch (error) {
      console.log(error);
      this.isLoading = false;
    }
  };
}
