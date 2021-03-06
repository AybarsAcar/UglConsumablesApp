import { makeAutoObservable, runInAction } from 'mobx';
import { history } from '../..';
import agent from '../api/agent';
import {
  OrderListItem,
  OrderFormValues,
  OrderItem,
  Order,
} from '../models/order';
import { store } from './store';

export default class OrderStore {
  orders: OrderListItem[] = [];
  selectedOrder: Order | null = null;

  isLoading = false;

  orderToCreate: OrderFormValues = new OrderFormValues();

  orderItemsToAdd = new Map<number, OrderItem>();

  constructor() {
    makeAutoObservable(this);
  }

  loadOrders = async () => {
    this.isLoading = true;

    try {
      const result = await agent.OrderRequests.list();

      result.forEach((orderListItem: OrderListItem) => {
        this.orders.push(orderListItem);
      });

      this.isLoading = false;
    } catch (error) {
      console.log(error);
      this.isLoading = false;
    }
  };

  loadOrder = async (id: number) => {
    this.isLoading = true;

    try {
      const result = await agent.OrderRequests.details(id);

      this.selectedOrder = result;

      this.isLoading = false;
    } catch (error) {
      console.log(error);
      this.isLoading = false;
    }
  };

  loadCurrentUsersOrders = async () => {
    this.isLoading = true;

    try {
      const result = await agent.OrderRequests.listCurrentUsersOrders();

      result.forEach((orderListItem) => {
        this.orders.push(orderListItem);
      });

      this.isLoading = false;
    } catch (error) {
      console.log(error);
      this.isLoading = false;
    }
  };

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

        store.tabStore.activeTabIndex = 1;
      });

      history.push('/');
    } catch (error) {
      console.log(error);
      this.isLoading = false;
    }
  };
}
