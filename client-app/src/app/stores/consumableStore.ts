//
// Class that stores the client state related to consumables
//

import { makeAutoObservable } from 'mobx';
import agent from '../api/agent';
import {
  Consumable,
  ConsumableFormValues,
  ConsumableSubmitValues,
} from '../models/consumable';

export default class ConsumableStore {
  public consumableRegistry = new Map<number, Consumable>();

  isLoading = false;
  isLoadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * returns consumables in an ascending order
   */
  get consumables() {
    return Array.from(this.consumableRegistry.values()).sort(
      (a, b) => a.sapId - b.sapId
    );
  }

  /**
   * loads all the consumables from the server through agent
   * and populates the client data store
   */
  loadConsumables = async (serviceOrderId: number | null = null) => {
    this.isLoadingInitial = true;

    try {
      if (serviceOrderId == null) {
        const result = await agent.ConsumableRequests.list();

        // populate the registry
        result.forEach((consumable) => {
          this.consumableRegistry.set(consumable.id, consumable);
        });
      } else {
        const result = await agent.ConsumableRequests.listByServiceOrder(
          serviceOrderId
        );

        // populate the registry
        result.forEach((consumable) => {
          this.consumableRegistry.set(consumable.id, consumable);
        });
      }
      this.setIsLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setIsLoadingInitial(false);
    }
  };

  addToServiceOrder = async (sapId: number, serviceOrderId: number) => {};

  createConsumable = async (consumable: ConsumableSubmitValues) => {
    try {
      await agent.ConsumableRequests.create(consumable);
    } catch (error) {
      console.log(error);
    }
  };

  loadConsumable = async (sapId: number) => {
    // TODO
  };

  setIsLoadingInitial = (state: boolean) => {
    this.isLoadingInitial = state;
  };
}
