//
// This file will contain all our requests
// to our Servers
//

import axios, { AxiosError, AxiosResponse } from 'axios';
import { AreaOfWork, AreaOfWorkFormValues } from '../models/areaOfWork';
import {
  Consumable,
  ConsumableFormValues,
  ConsumableSubmitValues,
} from '../models/consumable';
import {
  AccountLoginValues,
  AccountRegisterValues,
  User,
} from '../models/user';
import { store } from '../stores/store';

// add delay to the request to test loading behaviour
const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

// set the default url to request
axios.defaults.baseURL = 'http://localhost:5000/api';

// interceptor to send our token with requests
axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// set the axios interceptors
// delay all requests to the Server by 1 second
axios.interceptors.response.use(
  async (response) => {
    if (process.env.NODE_ENV === 'development') {
      // add delay for testin in development
      await sleep(1000);
    }

    return response;
  },
  (error: AxiosError) => {
    const { data, status, config, headers } = error.response!;

    console.log(error.response);

    // switch (status) {
    //   case 400:
    //     if (typeof data === 'string') {
    //       // otherwise, other 400 errors so just display the repsonse data from the API
    //       toast.error(data);
    //     }

    //     if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
    //       // bad guid validation
    //       history.push('/not-found');
    //     }

    //     if (data.errors) {
    //       // we have the errors object available - form validation error

    //       const modalStateErrors = [];

    //       for (const key in data.errors) {
    //         if (data.errors[key]) {
    //           modalStateErrors.push(data.errors[key]);
    //         }
    //       }
    //       throw modalStateErrors.flat();
    //     }

    //     break;

    //   case 401:
    //     if (
    //       status === 401 &&
    //       headers['www-authenticate']?.startsWith(
    //         'Bearer error="invalid_token"'
    //       )
    //     ) {
    //       store.userStore.logout();
    //       toast.error('Session expired, please login again');
    //     }
    //     break;

    //   case 404:
    //     history.push('/not-found');
    //     break;

    //   case 500:
    //     store.commonStore.setServerError(data);
    //     history.push('/server-error');
    //     break;
    // }
    return Promise.reject;
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

// this is our requests that we will make to the base URL
// just ot make the code reusable
const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

// all the requests to our endpoints in consumables controller
const ConsumableRequests = {
  list: () => requests.get<Consumable[]>('/consumable'),
  listByServiceOrder: (serviceOrder: number) =>
    requests.get<Consumable[]>(`/consumable?serviceOrderId=${serviceOrder}`),
  details: (sapId: number) => requests.get<Consumable>(`/consumable/${sapId}`),
  create: (consumable: ConsumableSubmitValues) =>
    requests.post<void>('/consumable', consumable),
  add: (sapId: number, serviceOrderId: number) =>
    requests.post<void>(`/consumable/${sapId}/${serviceOrderId}`, {}),
};

// all the requests to our endpoints in area of work controller
const AreaOfWorkRequests = {
  list: () => requests.get<AreaOfWork[]>('/areaOfWork'),
  details: (serviceOrder: number) =>
    requests.get<AreaOfWork>(`/areaOfWork/${serviceOrder}`),
  create: (areaOfWork: AreaOfWorkFormValues) =>
    requests.post<void>('/areaOfWork', areaOfWork),
  add: (serviceOrder: number, consumableSapId: number) =>
    requests.post<void>(
      `/areaOfWork/${serviceOrder}?consumableSapId=${consumableSapId}`,
      {}
    ),
};

const AccountRequests = {
  current: () => requests.get<User>('/account'),
  register: (user: AccountRegisterValues) =>
    requests.post<User>('/account/register', user),
  login: (user: AccountLoginValues) =>
    requests.post<User>('/account/login', user),
};

const agent = { ConsumableRequests, AreaOfWorkRequests, AccountRequests };

export default agent;
