export class AreaOfWorkFormValues {
  description: string = '';
  serviceOrder: number | undefined = undefined;

  constructor(areaOfWork?: AreaOfWorkFormValues) {
    if (areaOfWork) {
      this.description = areaOfWork.description;
      this.serviceOrder = areaOfWork.serviceOrder;
    }
  }
}

export interface AreaOfWork {
  id: number;
  description: string;
  serviceOrder: number;
}
