import { makeAutoObservable, runInAction } from 'mobx';
import {
  AccountLoginValues,
  AccountRegisterValues,
  User,
} from '../models/user';
import agent from '../api/agent';
import { store } from './store';
import { history } from '../..';

export default class AccountStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  getUser = async () => {
    try {
      const user = await agent.AccountRequests.current();

      store.commonStore.setToken(user.token);

      runInAction(() => (this.user = user));
    } catch (error) {
      console.log(error);
    }
  };

  login = async (creds: AccountLoginValues) => {
    try {
      const user = await agent.AccountRequests.login(creds);

      // set the token
      // wont be set if the user is null
      store.commonStore.setToken(user.token);

      // set the user in client side data
      runInAction(() => (this.user = user));

      store.modalStore.closeModal();

      // push them to the consumables page
      history.push('/consumables');
    } catch (error) {
      throw error;
    }
  };

  register = async (creds: AccountRegisterValues) => {
    try {
      const user = await agent.AccountRequests.register(creds);

      // set the token
      // wont be set if the user is null
      store.commonStore.setToken(user.token);

      // set the user in client side data
      runInAction(() => (this.user = user));

      store.modalStore.closeModal();

      history.push('/consumables');
    } catch (error) {
      throw error;
    }
  };

  logout = () => {
    store.commonStore.setToken(null);
    window.localStorage.removeItem('jwt');
    this.user = null;
    history.push('/');
  };
}
