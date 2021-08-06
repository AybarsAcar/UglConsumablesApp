//
// Class that stores the client state related to consumables
//

import { makeAutoObservable } from 'mobx';
import agent from '../api/agent';
import { Consumable } from '../models/consumable';

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
  loadConsumables = async () => {
    this.isLoadingInitial = true;

    try {
      const result = await agent.ConsumableRequests.list();

      // populate the registry
      result.forEach((consumable) => {
        this.consumableRegistry.set(consumable.id, consumable);
      });
      this.setIsLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setIsLoadingInitial(false);
    }
  };

  setIsLoadingInitial = (state: boolean) => {
    this.isLoadingInitial = state;
  };
}
