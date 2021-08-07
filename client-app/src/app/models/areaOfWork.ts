import { Consumable } from './consumable';

export interface AreaOfWorkFormValues {
  description: string;
  serviceOrder: number;
}

export interface AreaOfWorkListItem {
  id: number;
  description: string;
  serviceOrder: number;
}

export interface AreaOfWork {
  id: number;
  description: string;
  serviceOrder: number;
  consumableProducts: Consumable[];
}
