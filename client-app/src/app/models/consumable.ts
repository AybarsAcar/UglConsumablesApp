export interface Consumable {
  id: number;
  sapId: number;
  description: string;
  unitOfMeasue: string;
  isSite: boolean;
}

export interface ConsumableFormValues {
  sapId: number;
  description: string;
  unitOfMeasue: string;
  isSite: boolean;
}
