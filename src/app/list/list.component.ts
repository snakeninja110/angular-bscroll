import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
import { ScrollComponent } from '../base/scroll/scroll.component';
import { ItemsService } from '../service/items.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.styl']
})
export class ListComponent implements OnInit, AfterViewInit {

  probeType: Number = 3;
  clickable: Boolean = true;
  pos: any;
  list: Array<any>;
  noMoreData: Boolean = false;

  // infinite Scroll
  pullUpLoad: Boolean = true;
  pullUpLoadThreshold: Number = 0;
  pullUpLoadMoreTxt: String = '加载更多';
  pullUpLoadNoMoreTxt: String = '没有数据了';
  pullUpLoadObj: Object;

  // pullDown Refresh
  pullDownRefresh: Boolean = true;
  pullDownRefreshThreshold: Number = 90;
  pullDownRefreshStop: Number = 40;
  pullDownRefreshObj: Object;

  @ViewChild(ScrollComponent) scroll: ScrollComponent;

  constructor(private items: ItemsService, private router: Router) {
    this.list = this.items.getItems();
  }

  ngOnInit() {
    this.pullDownRefreshObj = this.pullDownRefresh ? {
      threshold: this.pullDownRefreshThreshold,
      stop: this.pullDownRefreshStop
    } : false;

    this.pullUpLoadObj = this.pullUpLoad ? {
      threshold: this.pullUpLoadThreshold,
      txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
    } : false;
  }

  ngAfterViewInit() {
  }

  hander(pos) {
    // console.log(pos);
  }

  onPullingUp() {
    // if (this.noMoreData) {
    //   return;
    // }
    console.log('pulling up and load data');
    setTimeout(() => {
      if (Math.random() > 0.5) {
        // 有新数据
        this.list.push(...this.items.getMoreItems());
      } else {
        this.noMoreData = true;
        this.scroll.forceUpdate(false);
      }
    }, 1000);
  }

  onPullingDown() {
    console.log('pulling down and Refresh');
    // 模拟新数据刷新，真实情况应该是刷新整个list
    setTimeout(() => {
      if (Math.random() > 0.5) {
        // 如果有新数据
        this.list.unshift(`new message ${+new Date()}`);
      }
      this.scroll.forceUpdate(false);
    }, 1000);
  }

  clickItem(item, index) {
    console.log(`这是第${index}个：${item}`);
    // this.router.navigate(['/item'], item);
  }
}
