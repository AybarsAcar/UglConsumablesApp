import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { AreaOfWork } from '../models/areaOfWork';
import { store } from './store';

export default class AreaOfWorkStore {
  selectedAreaOfWork: AreaOfWork | null = null;

  areaOfWorkRegistry = new Map<number, AreaOfWork>();

  areaOfWorks: AreaOfWork[] = [];

  // to be used in dropdown
  areaOfWorkOptions: {}[] = [];

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

      // populate the lookup
      result.forEach((areaOfWork) => {
        this.areaOfWorkRegistry.set(areaOfWork.serviceOrder, areaOfWork);
      });

      runInAction(() => this.setAreaOfWorkOptions());

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

      if (result != null) {
        this.selectedAreaOfWork = result;

        await store.consumableStore.loadConsumables(
          this.selectedAreaOfWork.serviceOrder
        );
      }
    } catch (error) {
      console.log(error);
      this.setIsLoadingInitial(false);
    }
  };

  setIsLoadingInitial = (state: boolean) => {
    this.isLoadingInitial = state;
  };

  private setAreaOfWorkOptions = () => {
    this.areaOfWorks.forEach((areaOfWork) => {
      this.areaOfWorkOptions.push({
        text: areaOfWork.description,
        value: areaOfWork.serviceOrder,
      });
    });
  };
}
