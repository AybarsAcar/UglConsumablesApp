import { AreaOfWork } from './areaOfWork';

export interface Consumable {
  id: number;
  sapId: number;
  description: string;
  unitOfMeasue: string;
  isSite: boolean;

  areaOfWorks: AreaOfWork[];

  orderQuantity?: number;
}

export class ConsumableFormValues {
  sapId: number | undefined = undefined;
  description: string = '';
  unitOfMeasue: string = '';
  isSite: boolean = false;

  areaOfWorks: AreaOfWork[] = [];

  constructor(consumable?: ConsumableFormValues) {
    if (consumable) {
      this.sapId = consumable.sapId;
      this.description = consumable.description;
      this.unitOfMeasue = consumable.unitOfMeasue;
      this.isSite = consumable.isSite;
      this.areaOfWorks = consumable.areaOfWorks;
    }
  }
}
