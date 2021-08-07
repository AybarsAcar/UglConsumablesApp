export interface Consumable {
  id: number;
  sapId: number;
  description: string;
  unitOfMeasue: string;
  isSite: boolean;

  orderQuantity?: number;
}

export interface ConsumableFormValues {
  sapId: number;
  description: string;
  unitOfMeasue: string;
  isSite: boolean;
}
