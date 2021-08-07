import { makeAutoObservable } from 'mobx';

export default class TabStore {
  activeTabIndex: number = 1;

  constructor() {
    makeAutoObservable(this);
  }

  setActiveTab = (index: number) => {
    this.activeTabIndex = index;
  };
}
