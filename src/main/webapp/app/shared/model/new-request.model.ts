import { Urgency } from 'app/shared/model/enumerations/urgency.model';

export interface INewRequest {
  title?: string;
  description?: string;
  urgency?: Urgency;
}

export class NewRequest implements INewRequest {
  constructor(public title?: string, public description?: string, public urgency?: Urgency) {}
}
