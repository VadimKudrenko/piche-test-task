import { IHolidays } from "./IHolidays";
import { IEvents } from "./IEvents";

export interface IFetchData {
  births: Array<object>;
  events: IEvents[];
  holidays: IHolidays[];
}