import {v4 as uuidv4} from 'uuid' //for uuid version>v7
//import uuid from 'uuid/v4' for version < v7

export interface IBasket {
    id: string;
    items: IBasketItem[];
  }
  
  export interface IBasketItem {
    id: number;
    productName: string;
    price: number;
    quantity: number;
    pictureUrl: string;
    brand: string;
    type: string;
  }

  export class Basket implements IBasket{
      id = uuidv4();
      items: IBasketItem[] = [];

  }

  export interface IBasketTotals{
    shipping: number;
    subtotal: number;
    total: number;

  }