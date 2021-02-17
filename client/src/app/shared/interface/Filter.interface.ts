import {FieldInterface} from "./Field.interface";

export interface FilterInterface {
  url: string
  page: number,
  items: FieldInterface[]
}
