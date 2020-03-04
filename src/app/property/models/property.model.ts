import { ModifyProperty } from '@app/property/interfaces/modify-property.interface';

export class Property {
  id: number;
  title: string;
  description: string;
  createdAt: number;

  constructor(data: ModifyProperty) {
    this.id = Math.floor(Math.random() * 1000000000) + 1;
    this.title = data.title;
    this.description = data.description;
    this.createdAt = Date.now();
  }
}
