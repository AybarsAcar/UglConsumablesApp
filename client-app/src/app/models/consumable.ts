import { AreaOfWork } from './areaOfWork';

export interface Consumable {
  id: number;
  sapId: number;
  description: string;
  unitOfMeasure: string;
  isSite: boolean;

  areaOfWorks: AreaOfWork[];

  orderQuantity?: number;
}

export interface ConsumableSubmitValues {
  sapId: number;
  description: string;
  unitOfMeasure: string;
  isSite: boolean;

  orderQuantity?: number;
}

export class ConsumableFormValues {
  sapId: number | undefined = undefined;
  description: string = '';
  unitOfMeasure: string = '';
  isSite: boolean = false;

  areaOfWorks: number[] = [];

  constructor(consumable?: ConsumableFormValues) {
    if (consumable) {
      this.sapId = consumable.sapId;
      this.description = consumable.description;
      this.unitOfMeasure = consumable.unitOfMeasure;
      this.isSite = consumable.isSite;
      this.areaOfWorks = consumable.areaOfWorks;
    }
  }
}
