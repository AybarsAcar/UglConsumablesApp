import { makeAutoObservable, reaction } from 'mobx';
import { ServerError } from '../models/serverError';

export default class CommonStore {
  token: string | null = window.localStorage.getItem('jwt');
  isAppLoaded = false;

  error: ServerError | null = null;

  constructor() {
    makeAutoObservable(this);

    // react to the value changing for logged in
    // this runs when there is a change to this.token or when it initially loads
    reaction(
      () => this.token,
      (token) => {
        if (token) {
          window.localStorage.setItem('jwt', token); // set the token if user exists
        } else {
          window.localStorage.removeItem('jwt'); // clean up
        }
      }
    );
  }

  setToken = (token: string | null) => {
    if (token) {
      this.token = token;
    }
  };

  setAppLoaded = () => {
    this.isAppLoaded = true;
  };

  setServerError = (error: ServerError) => {
    this.error = error;
  };
}
