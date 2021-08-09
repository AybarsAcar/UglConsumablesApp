import { createContext, useContext } from 'react';
import AccountStore from './accountStore';
import AreaOfWorkStore from './areaOfWorkStore';
import CommonStore from './commonStore';
import ConsumableStore from './consumableStore';
import { ModalStore } from './modalStore';
import OrderStore from './orderStore';
import TabStore from './tabStore';

interface Store {
  consumableStore: ConsumableStore;
  commonStore: CommonStore;
  accountStore: AccountStore;
  modalStore: ModalStore;
  tabStore: TabStore;
  areaOfWorkStore: AreaOfWorkStore;
  orderStore: OrderStore;
}

export const store: Store = {
  consumableStore: new ConsumableStore(),
  commonStore: new CommonStore(),
  accountStore: new AccountStore(),
  modalStore: new ModalStore(),
  tabStore: new TabStore(),
  areaOfWorkStore: new AreaOfWorkStore(),
  orderStore: new OrderStore(),
};

export const StoreContext = createContext(store);

// custom hook to use our stores
export function useStore() {
  return useContext(StoreContext);
}
