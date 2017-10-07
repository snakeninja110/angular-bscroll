import { Injectable } from '@angular/core';

@Injectable()
export class ItemsService {

  constructor() { }

  /**
   * 假装自己是数据接口
   */

  count: Number = 15;
  public list: Array<any> = [];
  itemIndex: any = 0;

  getItems() {
    for (let i = 0; i < this.count; i++) {
      this.list.push(`this is line ${++this.itemIndex}`);
    }
    return this.list;
  }

  getMoreItems() {
    let newPage: Array<any> = [];
    for (let i = 0; i < 5; i++) {
      newPage.push(`this is new Line ${++this.itemIndex}`);
    }
    return newPage;
  }
}
