import { Consumable } from './consumable';

export default interface Order {
  consumables: Consumable[];
  customerComment: string;
}
