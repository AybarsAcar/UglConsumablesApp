import { makeAutoObservable } from 'mobx';
import agent from '../api/agent';
import { AreaOfWork, AreaOfWorkListItem } from '../models/areaOfWork';
import { store } from './store';

export default class AreaOfWorkStore {
  selectedAreaOfWork: AreaOfWork | null = null;

  areaOfWorks: AreaOfWorkListItem[] = [];

  isLoading = false;
  isLoadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * loads all the consumables from the server through agent
   * and populates the client data store
   */
  loadAreaOfWorks = async () => {
    this.isLoadingInitial = true;

    try {
      const result = await agent.AreaOfWorkRequests.list();

      // populate the registry
      result.forEach((areaOfWork) => {
        this.areaOfWorks.push(areaOfWork);
      });
      this.setIsLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setIsLoadingInitial(false);
    }
  };

  selectAreaOfWork = async (serviceOrder: number) => {
    this.isLoadingInitial = true;

    try {
      const result = await agent.AreaOfWorkRequests.details(serviceOrder);

      this.selectedAreaOfWork = result;

      result.consumableProducts.forEach((consumable) => {
        store.consumableStore.consumableRegistry.set(consumable.id, consumable);
      });
    } catch (error) {
      console.log(error);
      this.setIsLoadingInitial(false);
    }
  };

  setIsLoadingInitial = (state: boolean) => {
    this.isLoadingInitial = state;
  };
}
