import { AreaOfWork } from './areaOfWork';

export interface Consumable {
  id: number;
  sapId: number;
  description: string;
  unitOfMeasure: string;
  isPrd: boolean;

  areaOfWorks: AreaOfWork[];

  orderQuantity?: number;
}

export interface ConsumableSubmitValues {
  sapId: number;
  description: string;
  unitOfMeasure: string;
  isPrd: boolean;

  orderQuantity?: number;
}

export class ConsumableFormValues {
  sapId: number | undefined = undefined;
  description: string = '';
  unitOfMeasure: string = '';
  isPrd: boolean = false;

  ServiceOrderIds: number[] = [];

  constructor(consumable?: ConsumableFormValues) {
    if (consumable) {
      this.sapId = consumable.sapId;
      this.description = consumable.description;
      this.unitOfMeasure = consumable.unitOfMeasure;
      this.isPrd = consumable.isPrd;
      this.ServiceOrderIds = consumable.ServiceOrderIds;
    }
  }
}
