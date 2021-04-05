import { IProduct } from "./product";

export interface IPagination {
  index: number;
  pageSize: number;
  count: number;
  data: IProduct[];
}

export class Pagination implements IPagination{
  index: number;
  pageSize: number;
  count: number;
  data: IProduct[] = [];
}